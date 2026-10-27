# Advent of Code

My solutions to [Advent of Code](https://adventofcode.com/), in TypeScript. There are days from 2015, 2020, 2023, 2024, and 2025 so far, none of the years finished.

## Setup

Needs Node 18 or newer.

```bash
npm install
cp .env.example .env
```

Then fill in `.env`:

- `AOC_SESSION` is your `session` cookie from adventofcode.com. Log in, open the browser's dev tools, and copy it from the site's cookies.
- `AOC_GITHUB_USERNAME` and `AOC_CONTACT_EMAIL` go into the `User-Agent` header on every request to adventofcode.com, which is what the site's author asks of automated tools. The scripts that talk to the site exit with an error if either one is missing.

## Working on a day

```bash
npm run start-day 2024 9      # create day-09.ts and day-09.spec.ts, then download the input
npm run get-problem 2024 9    # save the puzzle text to src/2024/problems/day-09.md
npm test -- day-09            # run that day's tests
npm run solve 2024 9          # build, then run both parts against the real input
npm run solve 2024 9 1        # part 1 only
npm run submit 2024 9 1       # compute part 1, ask for confirmation, submit it
```

`submit` keeps a small state file next to the puzzle text. It won't resend an answer the site already accepted, or one it already rejected.

Other commands:

```bash
npm run list-days [year]      # which days have solutions
npm run check-day 2024 9      # files present, exports present, input non-empty, builds
npm run fetch-input 2024 9    # download an input again
npm run check                 # prettier, tsc, eslint, vitest; run this before committing
npm run help                  # the full list
```

## Layout

```
src/
  2024/
    day-09.ts            solution: exports part1(input: string[]) and part2
    day-09.spec.ts       tests for that day, next to the solution
    inputs/day-09.txt    puzzle input, git-ignored
    problems/day-09.md   puzzle text, git-ignored
  utils/                 a few shared helpers
scripts/                 the npm commands above
```

Each solution exports `part1` and `part2`. Both take the input file as an array of lines, blank lines included, and return a number. Parsing happens inside the solution, so each day stands on its own.

Puzzle inputs and puzzle text are git-ignored because the Advent of Code author asks that they not be redistributed. A hook under `.claude/` also stops Claude Code from committing them, or anything that looks like a secret.

## Tests

Vitest, with globals on, so specs don't import `describe` or `test`. Each spec has one `describe` for the day and a nested `describe` per function, so a single function's tests can run alone:

```bash
npx vitest run day-09 -t "Day 09 > findGap >"
```

The trailing `>` keeps `compact` from also matching `compactFiles`.

## How these get written

I use Claude Code while solving, and the split is written down in `.claude/skills/aoc-day`. Claude writes the test fixtures from the puzzle's examples and whatever edge cases we talk through, and I write the solution. Commits it helped with carry a `Co-Authored-By` trailer. `CLAUDE.md` holds the conventions it's told to follow.

## License

MIT
