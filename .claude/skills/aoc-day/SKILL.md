---
name: aoc-day
description: Collaborative red/green/refactor workflow for implementing an Advent of Code day in this repo. Use when starting, resuming, or reviewing a src/<year>/day-DD.ts solution.
argument-hint: <year> <day>
---

# AoC day workflow

Use this loop for `src/<year>/day-<DD>.ts` rather than writing the solution
outright. The point of doing Advent of Code is to solve it yourself — Claude's
role here is pairing and verification, not authorship of the puzzle-solving
logic.

## 0. Scaffold + lint baseline

- Run `npm run start-day <year> <day>` (writes `day-DD.ts`, `day-DD.spec.ts`,
  fetches the input).
- Immediately run `npm run lint` (or `npm run check`) once, before writing
  anything. This shows which failures are pre-existing repo debt vs. new
  work, so the signal stays clean right before you'd otherwise notice it at
  submit/commit time.

## 1. Red — Claude writes the tests

- Discuss the puzzle's examples and edge cases in chat. Paste the actual
  fetched puzzle text into the reply when discussing it — don't just read it
  via a tool and summarize; only text output is visible to the user.
- **Claude writes the failing `test.each`/`test.todo.each` fixtures** in
  `day-DD.spec.ts` — this is the one file Claude edits directly in this
  workflow.
- For any hand-built fixture involving nontrivial arithmetic, compute-verify
  the expected value with an actual script (e.g. `node -e "..."` or
  `python3 -c "..."`) before writing it in — never write in a
  mentally-calculated number.
- Run `npm test` to confirm the tests fail for the right reason before moving
  on.

## 2. Green — the user writes the implementation

- **The user writes the core solving logic in `day-DD.ts`.** Claude does not
  write it and does not delegate it to a subagent — that defeats the point
  of solving the puzzle yourself. Claude's job here is to run `npm test` /
  `npm run typecheck` on request and report what's failing, and to discuss
  approach/algorithm tradeoffs when asked, not to produce the code.
- Treat `day-DD.spec.ts` as a locked contract during this phase: Claude wrote
  it in step 1 and does not edit it again here. If a test looks wrong, stop
  and flag it for discussion instead of changing it.
- Call out tricky edge cases baked into the fixtures explicitly (e.g.
  "duplicate values in the input") rather than assuming they'll be noticed.

## 3. Refactor — together

- Once green, review the diff together and decide what to clean up.
- Run `npm run check` before considering the day done.

## 4. Submit

- Use the `aoc-submit` skill: `/aoc-submit <year> <day> <part>`.
