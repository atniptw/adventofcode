# Advent of Code - Usage Guide

This repository is structured as a monorepo with workspaces to support multiple years of Advent of Code solutions with shared utilities and easy execution from the root directory.

## Monorepo Structure

```
advent-of-code/
├── packages/
│   └── aoc-utils/              # Shared utilities package
├── years/                      # Year-specific solutions
│   └── 2024/
├── scripts/                    # Build and setup scripts
├── template/                   # Template for new years
└── package.json               # Root workspace configuration
```

## Setup a New Year

To create a new year with all the necessary scaffolding:

```bash
npm run setup 2025
```

This will:
- Create a new workspace in `years/2025/`
- Copy all necessary configuration files
- Generate day files (`day-01.ts` through `day-25.ts`) with utility imports
- Generate test files (`day-01.spec.ts` through `day-25.spec.ts`)
- Create empty input files (`src/inputs/day-01.txt` through `src/inputs/day-25.txt`)
- Configure the package to use `@aoc/utils`

After setup, install dependencies for the entire monorepo:
```bash
npm install
```

## Running Solutions

From the repository root, you can run any year/day/part combination:

```bash
# Run both parts of day 1 for 2024
npm run solve 2024 1

# Run only part 1 of day 1 for 2024  
npm run solve 2024 1 1

# Run only part 2 of day 1 for 2024
npm run solve 2024 1 2

# Run both parts of day 15 for 2025
npm run solve 2025 15
```

## Workspace Benefits

1. **Shared Dependencies**: All years can use `@aoc/utils` without duplication
2. **Unified Commands**: Run build, test, and lint across all workspaces from root
3. **Version Management**: Single `package-lock.json` for the entire monorepo
4. **Cross-workspace Development**: Easy to update utilities and see changes across all years

## Working on a Solution

1. Add your puzzle input to the corresponding input file:
   ```
   years/2024/src/inputs/day-01.txt
   ```
   **Important:** Input files are automatically ignored by git (per AoC creator's request). Never commit puzzle inputs to version control.

2. Implement your solution using shared utilities:
   ```typescript
   // years/2024/src/day-01.ts
   import { parseNumberGrid, Grid, frequency } from '@aoc/utils';

   export function part1(input: string[]): number {
       // Use shared utilities for common patterns
       const grid = parseNumberGrid(input);
       return result;
   }

   export function part2(input: string[]): number {
       // Utilities make solutions more concise  
       return result;
   }
   ```

3. Add tests using utilities:
   ```typescript
   // years/2024/test/day-01.spec.ts
   import { part1, part2 } from '../src/day-01';

   describe('Day 1', () => {
       const testInput = ['test', 'input'];

       test('part1', () => {
           expect(part1(testInput)).toBe(expectedResult);
       });
   });
   ```

4. Run your solution:
   ```bash
   npm run solve 2024 1
   ```

## Workspace Commands

Run commands across all workspaces:
```bash
npm run build    # Build all packages
npm run test     # Test all packages  
npm run lint     # Lint all packages
npm run clean    # Clean all build artifacts
```

Work with specific workspaces:
```bash
npm run build -w @aoc/2024      # Build only 2024
npm run test -w @aoc/utils      # Test only utils
npm run lint -w @aoc/2025      # Lint only 2025
```

## Input Format

- Each solution function receives `input: string[]` where each array element is a line from the input file
- Empty lines are preserved in the array
- No automatic parsing is done - handle the input format as needed for each puzzle

## Input File Guidelines

**IMPORTANT:** The Advent of Code creator has specifically requested that puzzle inputs NOT be shared publicly. This repository is configured to automatically ignore all input files:

- ✅ Input files (`.txt` files in `inputs/` directories) are automatically ignored by git
- ✅ You can safely run `git add .` without risk of committing input files
- ✅ Template input files are empty placeholders - add your personal puzzle inputs
- ⚠️ **Never commit actual puzzle inputs** - respect the AoC creator's request

The following patterns are ignored:
```
**/inputs/*.txt
years/*/src/inputs/day-*.txt
packages/*/src/inputs/*.txt
```