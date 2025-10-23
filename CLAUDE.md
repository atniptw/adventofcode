# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a single-package TypeScript project for Advent of Code solutions:

- `src/utils/` - Shared utilities (Grid, parsing, math functions)
- `src/<year>/` - Year-specific solutions (e.g., 2023, 2024)
- `src/<year>/inputs/` - Puzzle input files (git-ignored, user-specific)
- `scripts/` - Helper scripts for running, fetching, and managing solutions
- `build/` - Compiled JavaScript output (auto-generated)

## Essential Commands

### Running Solutions

```bash
npm run solve <year> <day> [part]  # Execute from repository root

# Examples:
npm run solve 2024 1      # Run both parts
npm run solve 2024 1 1    # Run part 1 only
npm run solve 2024 1 2    # Run part 2 only
```

### Fetching Puzzle Inputs

```bash
npm run fetch-input <year> <day> [session]  # Download input from adventofcode.com

# Examples:
npm run fetch-input 2024 1                    # Uses AOC_SESSION env var or .env file
npm run fetch-input 2024 1 <session-token>    # Provide session directly
```

To get your session token:

1. Log in to adventofcode.com
2. Open browser DevTools (F12)
3. Go to Application/Storage > Cookies
4. Copy the value of the "session" cookie
5. Save in `.env` file as `AOC_SESSION=<your-token>` (recommended)

### Setting Up New Days

```bash
npm run start-day <year> <day>    # Creates files and downloads input (if session configured)
```

### Development Commands

```bash
npm run build             # Compile TypeScript to JavaScript
npm run test              # Test all files (Vitest)
npm run test:watch        # Watch mode testing
npm run test:coverage     # Coverage reports
npm run lint              # Lint code (Note: scripts/ has Node.js globals issues)
npm run lint:fix          # Auto-fix linting issues
npm run typecheck         # TypeScript type checking
npm run clean             # Clean build artifacts
npm run check             # Full pipeline: typecheck + lint + test

# Test specific days:
npm test -- day-01        # Run tests for day 01 across all years
npm test -- 2024          # Run all tests for 2024
```

## Architecture

### Solution Execution Flow

1. `scripts/runner.js` validates arguments and checks year/day existence
2. Compiles TypeScript files using `tsc`
3. Dynamically imports the compiled JavaScript module
4. Reads input from `src/<year>/inputs/day-<DD>.txt`
5. Executes `part1` and `part2` functions with timing

### Shared Utilities (src/utils/)

Solutions can import utilities, but note the current import setup:

- **parsing.ts**: `parseNumbers`, `parseNumberGrid`, `parseNumberColumns`, `parseCharGrid`, `joinLines`
- **grid.ts**: `Grid<T>` class with navigation, search, and word-finding methods
- **math.ts**: `sum`, `product`, `min`, `max`, `count`, `frequency`, `isSorted`, `removeAt`

**Important**: Due to ESM module resolution issues, utilities imports are currently commented out in template files. For now, either:

1. Copy needed utility functions directly into your solution
2. Use the commented import as reference for what's available

### File Naming Convention

- Solution files: `src/<year>/day-01.ts` through `day-25.ts` (zero-padded)
- Input files: `src/<year>/inputs/day-01.txt` (must be added manually, git-ignored)
- Test files: `test/<year>/day-01.spec.ts`

## Important Policies

### Input File Protection

- **NEVER commit input files** - Creator requested inputs not be shared publicly
- All `*.txt` files in `inputs/` directories are git-ignored
- Each user must add their own puzzle inputs locally
- Use `npm run fetch-input` to download your personal inputs

### Solution Structure

Every solution file must export these two functions:

```typescript
export function part1(input: string[]): number {
  // Implementation
  return result;
}

export function part2(input: string[]): number {
  // Implementation
  return result;
}
```

### TypeScript Setup

- Single package.json at root with all dependencies
- TypeScript configured with `@tsconfig/node18` base
- Target: ES2022, Module: ESNext
- Strict mode enabled
- Vitest for testing with native TypeScript support
- ESLint configured (note: scripts/ folder has Node.js global issues)

## Common Patterns

When implementing solutions:

1. Input is always provided as `string[]` (one line per element)
2. Solutions must return numbers (or values that coerce to numbers)
3. Empty lines in input are preserved as empty strings
4. Consider edge cases like empty input, single values, etc.

### Handling Overlapping Patterns (e.g., Day 1 2023)

When dealing with overlapping word patterns (like "eightwo" containing both "eight" and "two"):

```typescript
// Scan character by character to find all matches
for (let i = 0; i < line.length; i++) {
  // Check for patterns starting at position i
  // Don't skip ahead after finding a match
}
```

## AI Agent Quick Reference

### First Steps for AI Agents

When working with this project, ALWAYS start with these commands to understand the current state:

1. **`npm run aoc-status`** - Get project overview and see what years/days exist
2. **`npm run list-days [year]`** - See detailed status of all days (which have solutions, tests, inputs)
3. **`npm run help`** - Display all available commands with examples

### Common AI Agent Tasks

#### Starting a New Day

```bash
npm run start-day <year> <day>    # Creates solution, test files, and downloads input if session configured
```

#### Checking Before Solving

```bash
npm run check-day <year> <day>    # Validates files exist and shows what's missing
```

#### Running Solutions

```bash
npm run solve <year> <day>        # Run solution with actual input
npm test -- day-<DD>              # Run tests for specific day
```

#### Discovery & Debugging

```bash
npm run aoc-status                # Project health check
npm run list-days 2024            # See what's implemented for 2024
npm run typecheck                 # Check TypeScript compilation
npm run build                     # Compile TypeScript (required before running)
```

## File Locations for AI Agents

### Predictable Structure

- Solutions: `src/<year>/day-<DD>.ts` (always zero-padded, e.g., day-01.ts)
- Tests: `test/<year>/day-<DD>.spec.ts`
- Inputs: `src/<year>/inputs/day-<DD>.txt`
- Utils: `src/utils/*.ts` (shared utilities)
- Scripts: `scripts/*.js` (tooling scripts)

### Creating New Year Directory

If a year doesn't exist yet:

```bash
mkdir -p src/<year>/inputs
```

## Error Handling for AI Agents

Common errors and solutions:

- **"Directory not found"** → Year doesn't exist, create it first
- **"Cannot find module"** → Run `npm run build` first
- **"Missing input file"** → Use `npm run fetch-input <year> <day>`
- **"Module resolution error"** → Check imports, may need to copy utility functions
- **Linting errors in scripts/** → Normal, these are Node.js files with global objects

## Validation Workflow

1. `npm run check-day <year> <day>` - Verify all files exist
2. Implement solution in `src/<year>/day-<DD>.ts`
3. Add test cases in `src/<year>/day-<DD>.spec.ts`
4. `npm run solve <year> <day>` - Test with actual input
5. `npm test -- day-<DD>` - Run unit tests
6. `npm run typecheck` - Verify TypeScript types

## Testing Best Practices

When writing tests, consider these categories:

1. **Basic Examples** - Test cases from the problem description
2. **Edge Cases** - Empty input, single items, boundary values
3. **Complex Scenarios** - Overlapping patterns, large inputs
4. **Regression Tests** - Known tricky cases from past bugs

Example test structure:

```typescript
describe('Day XX: Problem Name', () => {
  describe('Basic Examples', () => {
    test('part1 examples from AoC', () => {
      // Test with example input
    });
  });

  describe('Edge Cases', () => {
    test('handles empty input', () => {
      expect(part1([])).toBe(0);
    });
  });
});
```

## Current Known Issues

1. **ESM Module Resolution**: Importing from `src/utils` has path resolution issues. Current workaround is to copy needed functions directly into solutions.

2. **Linting Errors**: The `scripts/` directory shows linting errors for Node.js globals (`console`, `process`). This is expected and doesn't affect functionality.

3. **Build Required**: Must run `npm run build` before `npm run solve` to compile TypeScript to JavaScript.

## Tips for Success

- Always run `npm run aoc-status` first to understand project state
- Use `npm run check-day` before starting implementation
- Test incrementally - implement part 1, test it, then move to part 2
- Write tests for edge cases, not just the examples
- Remember that overlapping patterns are common in word-search problems
- Check existing solutions in the same year for patterns and style consistency
