---
name: aoc-submit
description: Submit a computed answer for an Advent of Code day/part. Side-effecting and rate-limited by adventofcode.com — invoke explicitly, never automatically.
argument-hint: <year> <day> <part>
disable-model-invocation: true
---

# AoC submit workflow

Submitting is external and hard to reverse: AoC rate-limits wrong guesses,
and the local state tracker (`src/<year>/problems/day-DD.state.json`) refuses
to resubmit an answer already known wrong or already correct. Always confirm
before submitting.

1. Run `npm run solve <year> <day> <part>` to build and compute the answer.
   This has no confirmation gate, unlike running `submit` bare (which blocks
   on a y/N prompt a non-interactive shell can't answer) — using `solve`
   first avoids building/computing the answer twice.
2. State the computed answer in the reply and confirm it with the user
   before submitting (e.g. via `AskUserQuestion`) — never submit on a guess.
3. Once confirmed, submit in one shot with the confirmation piped in:
   `echo "y" | npm run submit <year> <day> <part>`.
