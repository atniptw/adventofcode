# Copilot Instructions

Purpose: Equip AI coding agents to be immediately productive in this Advent of Code TypeScript repo by documenting real, repo-specific workflows and conventions.

## Big Picture

- Single-package TypeScript; strict ESM; Vitest for tests.
- Per-year solutions under `src/<year>/day-<DD>.ts`; examples/tests in `src/<year>/day-<DD>.spec.ts`.
- Inputs live in `src/<year>/inputs/day-<DD>.txt` (git-ignored). Build outputs in `build/<year>/day-<DD>.js`.
- Shared helpers: `src/utils/` (grid, parsing, math). Scripts in `scripts/` orchestrate scaffolding, input fetch, runs.

## Required Day Shape

- Export `part1(input: string[]): number` and `part2(input: string[]): number` from each `day-<DD>.ts`.
- Input arrives as array of lines (preserve empty lines). Return numeric results.
- Use zero-padded day filenames: `day-01.ts` … `day-25.ts`.

## Core Workflows

- Discover status/help: `npm run list-days <year>`, `npm run help`.
- Scaffold a day: `npm run start-day <year> <day>` (creates TS/spec/input and can fetch input when `AOC_SESSION` is set).
- Run solutions: `npm run solve <year> <day> [part]` (auto-compiles if needed via `scripts/runner.js`).
- Validate a day: `npm run check-day <year> <day>` (compilation + tests + basic sanity).
- Fetch input: `npm run fetch-input <year> <day> [session]` (defaults to `.env` `AOC_SESSION`).
- Quality: `npm test`, `npm test -- day-<DD>`, `npm run test:watch`, `npm run test:coverage`, `npm run lint`, `npm run typecheck`, `npm run build`.

## VS Code Tasks

- Tasks mirror CLI: `help`, `list-days`, `start-day`, `run (solve)`, `input (fetch-input)`, `check-day`. Prefer tasks where convenient.

## Utilities & Patterns (src/utils)

- Parsing: `parseNumbers`, `parseNumberGrid`, `parseNumberColumns`, `parseCharGrid`, `joinLines`.
- Grid: `Grid.fromStrings(lines)`, `getNeighbors`, `findAll`, `findFirst`, `countWordOccurrences`, `forEach`.
- Math/arrays: `sum`, `product`, `count(arr, pred)`, `frequency`, `isSorted`, `removeAt`.
- Example (Day 1 alignment): `const [l, r] = parseNumberColumns(input, '   '); const score = sum(l.map(x => frequency(r)[x] * x));`.
- Example (Grid word search): `const grid = Grid.fromStrings(input); const xmas = grid.countWordOccurrences('XMAS');`.

## Execution Model

- `scripts/runner.js` compiles TS, loads `build/<year>/day-<DD>.js`, reads `inputs/day-<DD>.txt`, and times `part1/part2`.
- Build before solve is handled automatically by the runner; `npm run build` is available for manual prebuilds.

## Inputs Policy

- Do not commit inputs; `src/<year>/inputs/` is git-ignored.
- Fetch via `npm run start-day` or `npm run fetch-input` with `AOC_SESSION` set in `.env`.

## Testing Conventions

- One spec per day in `src/<year>/day-<DD>.spec.ts` using Vitest.
- Filter runs: `npm test -- day-<DD>` or by year prefix.
- Include AoC examples and edge cases (e.g., overlapping words like "eightwo", empty input handling).

## Project-Specific Tips

- Preserve line-by-line scanning for overlapping word patterns; do not advance past matches.
- Use `isSorted` and bounded differences for safety-report style problems (e.g., 2025 Day 2).
- For alignment/similarity scoring, sort columns and leverage `frequency` and `sum`.
- For grids, prefer `Grid` helpers over manual indexing for clarity and correctness.

## Key Files & Directories

- `src/utils/*.ts` — shared helpers used across days.
- `scripts/*.js` — commands: `runner.js`, `start-day.js`, `fetch-input.js`, `check-day.js`, `list-days.js`, `help.js`.
- `vitest.config.ts`, `eslint.config.mjs`, `tsconfig.json` — test/lint/TS settings.

## Agent Quickstart

1. `npm run list-days <year>`.
2. `npm run start-day <year> <day>`.
3. Implement `part1/part2` using `src/utils/` helpers.
4. Add/adjust tests in `src/<year>/day-<DD>.spec.ts`.
5. `npm run solve <year> <day>`; `npm test -- day-<DD>`.
6. `npm run check-day <year> <day>` before finalizing.

Note: Scripts reference `CLAUDE.md` for documentation, but this repo uses the above instructions as the authoritative agent guide.
