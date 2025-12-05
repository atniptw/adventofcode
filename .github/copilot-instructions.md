# Copilot Instructions

Purpose: Help AI coding agents be immediately productive in this Advent of Code TypeScript repo. Focus on concrete project workflows and conventions already in use.

## Big Picture
- Single-package TypeScript project; ESM modules; strict TS; Vitest.
- Solutions live under `src/<year>/day-<DD>.ts`; inputs under `src/<year>/inputs/day-<DD>.txt` (git-ignored); tests under `src/<year>/*.spec.ts`.
- Shared helpers in `src/utils/` (grid, parsing, math). Built JS resides in `build/` via `npm run build`.
- Scripts in `scripts/` power discovery, scaffolding, input fetch, and running solutions.

## Required Solution Shape
- Every day file must export: `part1(input: string[]): number` and `part2(input: string[]): number`.
- Input is an array of lines (empty lines preserved). Return a number (or numeric).
- Zero-padded day filenames: `day-01.ts` … `day-25.ts`.

## Core Workflows (CLI)
- Status/Discovery: `npm run aoc-status`, `npm run list-days <year>`, `npm run help`.
- Scaffold new day: `npm run start-day <year> <day>` (creates TS, spec, input, and fetches input if session set).
- Run solution: `npm run solve <year> <day> [part]`.
- Validate day: `npm run check-day <year> <day>`.
- Inputs: `npm run fetch-input <year> <day> [session]`; configure `AOC_SESSION` in `.env`.
- Quality: `npm test`, `npm test -- day-05`, `npm run test:watch`, `npm run test:coverage`, `npm run lint`, `npm run typecheck`, `npm run build`.

## VS Code Tasks
- Tasks mirror the CLI: `aoc-status`, `help`, `list-days`, `start-day`, `run (solve)`, `input (fetch-input)`, `check-day`. Prefer using tasks when available.

## Utilities Patterns (from `src/utils/`)
- Parsing: `parseNumbers`, `parseNumberGrid`, `parseNumberColumns`, `parseCharGrid`, `joinLines`.
- Grid: `Grid.fromStrings(lines)`, `getNeighbors`, `findAll`, `findFirst`, `countWordOccurrences`, `forEach`.
- Math/arrays: `sum`, `product`, `count(arr, pred)`, `frequency`, `isSorted`, `removeAt`.
- Example (Day 1-like): `const [left, right] = parseNumberColumns(input, '   '); const freq = frequency(right);`.
- Example (Grid/Day 4-like): `const grid = Grid.fromStrings(input); const xmas = grid.countWordOccurrences('XMAS');`.

## Execution Flow (scripts)
- `scripts/runner.js` checks args, compiles TS, loads built module from `build/<year>/day-<DD>.js`, reads `inputs/day-<DD>.txt`, times `part1/part2`.
- Build is required before solve; use `npm run build` or rely on runner if it compiles.

## Inputs Policy
- Do not commit AoC inputs. They are git-ignored under `src/<year>/inputs/`.
- Fetch via `npm run fetch-input` or `npm run start-day` after setting `AOC_SESSION`.

## Testing Conventions
- Tests per day: `src/<year>/day-<DD>.spec.ts` using Vitest.
- Filter runs: `npm test -- day-05` or by year.
- Include example cases from AoC plus edge cases (empty input, overlaps like "eightwo").

## Common Solution Patterns
- Scan strings character-by-character for overlapping word patterns; do not skip after a match.
- For safety-style checks (e.g., Day 2 2025): use `isSorted(list, maxDiff)` and `count(reports, predicate)`.
- For alignment problems (Day 1 2024): sort columns and `sum` distances; use `frequency` for similarity scores.
- For word search grids (Day 4 2024): use `Grid` methods to count occurrences and diagonals.

## Files To Know
- `src/utils/*.ts` — core helpers used across days.
- `scripts/*.js` — command implementations: `runner.js`, `start-day.js`, `fetch-input.js`, `check-day.js`, `list-days.js`, `help.js`, `aoc-status.js`.
- `vitest.config.ts`, `eslint.config.mjs`, `tsconfig.json` — test, lint, TS settings.

## Agent Startup Checklist
1. Run `npm run aoc-status` and `npm run list-days <year>`.
2. If starting fresh, `npm run start-day <year> <day>`.
3. Implement `part1/part2` using `src/utils/` where applicable.
4. Add/adjust tests in `src/<year>/day-<DD>.spec.ts`.
5. `npm run solve <year> <day>` and `npm test -- day-<DD>`.
6. Use `npm run check-day <year> <day>` before finalizing.

If any section is unclear or missing project-specific nuances, tell us which part and we’ll refine this doc.