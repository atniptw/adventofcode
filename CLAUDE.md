# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-package TypeScript (strict ESM) solutions for [Advent of Code](https://adventofcode.com/), spanning multiple years (2015, 2023, 2024, 2025). Tested with Vitest, linted with ESLint + typescript-eslint (type-aware, strict), formatted with Prettier.

## Commands

```bash
npm run start-day <year> <day>   # scaffold day-<DD>.ts + day-<DD>.spec.ts + inputs/day-<DD>.txt, then fetch input
npm run solve <year> <day> [1|2] # build + run a day's solution against its input file (omit part for both)
npm run fetch-input <year> <day> # (re)download puzzle input; uses AOC_SESSION from .env
npm run check-day <year> <day>   # validate a day: files exist, exports present, input non-empty, build status
npm run list-days [year]         # status overview of implemented days
npm run help                     # list all CLI commands

npm test                         # run all tests (vitest run)
npm test -- day-05                # run tests matching a name, e.g. one day
npm run test:watch               # vitest watch mode
npm run test:coverage            # coverage report
npm run lint / lint:fix          # eslint
npm run typecheck                # tsc --noEmit
npm run format / format:check    # prettier
npm run check                    # typecheck && lint && test — run before considering work done
npm run build                    # tsc -> build/<year>/day-<DD>.js (runner does this automatically)
```

VS Code tasks (`.vscode/tasks.json`) mirror `list-days`, `check-day`, `fetch-input`, `help`, `solve` (as "run"), and `start-day` (as "start"), each prompting for year/day.

## Architecture

- `src/<year>/day-<DD>.ts` — one file per puzzle day, must export `part1(input: string[]): number` and `part2(input: string[]): number`. Input is the puzzle input split into lines (blank lines preserved); parse it internally rather than expecting pre-parsed data.
- `src/<year>/day-<DD>.spec.ts` — colocated Vitest spec (not under a separate `test/` dir), importing from `./day-DD.js` (note the `.js` extension on a `.ts` import — required by ESM/NodeNext resolution). Uses `describe` + `test.each` with `{ input, expected }` fixtures; new scaffolds start with `test.todo.each`.
- `src/<year>/inputs/day-DD.txt` — personal puzzle input, git-ignored (AoC forbids sharing inputs). Never add these to git even via `git add -A`.
- `src/utils/` — shared helpers, all re-exported from `src/utils/index.ts`:
  - `parsing.ts`: `parseNumbers`, `parseNumberGrid`, `parseNumberColumns`, `parseCharGrid`, `joinLines`
  - `grid.ts`: `Grid<T>` class — `fromStrings`, `get`/`set`, `isInBounds`, `findAll`/`findFirst`, `getNeighbor(s)`, `getLine` (walk in a `Direction`), `countWordOccurrences` (word-search style, 4-direction + reverse), `forEach`, `map`, `clone`
  - `math.ts`: `sum`, `product`, `min`, `max`, `count`, `frequency` (returns `Map`), `isAscending`/`isDescending`/`isSorted` (optional `maxDiff`), `removeAt`
  - `index.ts` also has `assertDefined`/`getOrThrow`, `getOrDefault`, `isDefined` — use these instead of ad hoc `!`/`??` checks to satisfy `noUncheckedIndexedAccess`
- `scripts/*.js` — Node scripts backing the npm commands above (`runner.js` compiles via `tsc` then dynamically imports the built JS and times each part; `start-day.js` writes templates and shells out to `fetch-input.js`).

## Conventions specific to this repo

- Day files use zero-padded two-digit numbers everywhere: `day-01.ts` … `day-25.ts`.
- Solutions are plain functions with no shared state between part1/part2 — each re-parses `input` independently.
- TS config is strict, including `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, and `noPropertyAccessFromIndexSignature` — array/object indexing returns `T | undefined`; handle it explicitly (or use the `src/utils` helpers) rather than asserting.
- ESLint enables type-aware rules (`strict-boolean-expressions`, `no-explicit-any`, `consistent-type-imports`, `no-floating-promises`, etc.) against `tsconfig.eslint.json`. Non-null assertions (`!`) are allowed by config and used in `utils/grid.ts`, but prefer explicit checks in new code.
- `AOC_SESSION` (from `.env`, see `.env.example`) is required for automatic input fetching; never commit `.env` or puzzle inputs.
