#!/usr/bin/env bash
# PreToolUse hook (Bash matcher): blocks `git commit` when the staged diff
# contains Advent-of-Code-restricted content or secret-looking strings.
set -uo pipefail

input=$(cat)
command=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')

case "$command" in
  *"git commit"*) ;;
  *) exit 0 ;;
esac

repo_root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0
cd "$repo_root" || exit 0

violations=()

# 1. Advent of Code puzzle input/text must never be committed (also
#    git-ignored, but `git add -f` or a gitignore edit could bypass that).
restricted=$(git diff --cached --name-only -- 'src/*/inputs/*.txt' 'src/*/problems/*' 2>/dev/null || true)
if [ -n "$restricted" ]; then
  violations+=("Advent of Code puzzle input/text is staged (not allowed to be shared publicly):
$restricted")
fi

# 2. .env-style files, excluding the committed .env.example template.
env_files=$(git diff --cached --name-only 2>/dev/null | grep -E '(^|/)\.env(\..+)?$' | grep -v '\.env\.example$' || true)
if [ -n "$env_files" ]; then
  violations+=("A .env-style file is staged (likely contains secrets):
$env_files")
fi

# 3. Secret-looking strings among the *added* lines of the staged diff.
#    .env.example (expected placeholders) and this script (contains the
#    patterns below as literal text) are excluded from the scan.
added=$(git diff --cached --unified=0 -- . ':!.env.example' ':!.claude/hooks/check-commit-safety.sh' 2>/dev/null \
  | grep -E '^\+[^+]' | cut -c2-)

strict_hits=$(printf '%s\n' "$added" | grep -nP \
  '(AKIA[0-9A-Z]{16})|(gh[pousr]_[A-Za-z0-9]{20,})|(xox[baprs]-[A-Za-z0-9-]{10,})|(AIza[0-9A-Za-z_-]{35})|(-----BEGIN [A-Z ]*PRIVATE KEY-----)' \
  || true)
generic_hits=$(printf '%s\n' "$added" | grep -inP \
  '(AOC_SESSION\s*=\s*[A-Za-z0-9]{20,})|((SECRET|TOKEN|API[_-]?KEY|PASSWORD|PASSWD|ACCESS[_-]?KEY)[A-Z0-9_]*\s*[:=]\s*[A-Za-z0-9/+_=.-]{16,})' \
  || true)
secret_hits=$(printf '%s\n%s\n' "$strict_hits" "$generic_hits" | sed '/^$/d')
if [ -n "$secret_hits" ]; then
  violations+=("Possible secret found in staged changes:
$secret_hits")
fi

if [ "${#violations[@]}" -eq 0 ]; then
  exit 0
fi

reason=$(printf '%s\n\n' "${violations[@]}")
reason=$(printf '%s' "$reason" | head -c 4000)

jq -n --arg reason "$reason" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: ("Commit blocked by check-commit-safety hook:\n\n" + $reason)
  },
  systemMessage: "🚫 Commit blocked: possible secret or Advent-of-Code-restricted file staged (see reason for details)"
}'
exit 0
