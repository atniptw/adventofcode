# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

This is a monorepo for Advent of Code solutions using npm workspaces:
- `packages/aoc-utils/` - Shared utilities (Grid, parsing, math functions)
- `years/*/` - Year-specific solutions (e.g., 2023, 2024)
- `scripts/` - Runner and setup scripts
- `template/` - Template for creating new year workspaces

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
npm run start-day <year> <day>    # Creates files and downloads input
```

### Development Commands
```bash
npm run build             # Build all workspaces
npm run test              # Test all workspaces (Vitest)
npm run test:watch        # Watch mode testing
npm run test:coverage     # Coverage reports
npm run lint              # Lint all workspaces
npm run lint:fix          # Auto-fix linting issues
npm run typecheck         # TypeScript type checking
npm run clean             # Clean build artifacts
npm run check             # Full pipeline: typecheck + lint + test

# Workspace-specific:
npm run build -w @aoc/2024    # Build specific year
npm run test -w @aoc/utils    # Test utilities only
```

## Architecture

### Solution Execution Flow
1. `scripts/runner.js` validates arguments and checks year/day existence
2. Creates temporary TypeScript runner file in the year directory
3. Uses `ts-node` to compile and execute the solution
4. Each solution exports `part1(input: string[]): number` and `part2(input: string[]): number`
5. Input is read from `years/<year>/src/inputs/day-<DD>.txt`

### Shared Utilities (@aoc/utils)
All solutions import utilities via `import { ... } from '@aoc/utils'`:
- **parsing.ts**: `parseNumbers`, `parseNumberGrid`, `parseNumberColumns`, `parseCharGrid`, `joinLines`
- **grid.ts**: `Grid<T>` class with navigation, search, and word-finding methods
- **math.ts**: `sum`, `product`, `min`, `max`, `count`, `frequency`, `isSorted`, `removeAt`

### File Naming Convention
- Solution files: `day-01.ts` through `day-25.ts` (zero-padded)
- Input files: `inputs/day-01.txt` (must be added manually, git-ignored)
- Test files: `test/day-01.spec.ts`

## Important Policies

### Input File Protection
- **NEVER commit input files** - Creator requested inputs not be shared publicly
- All `*.txt` files in `inputs/` directories are git-ignored
- Each user must add their own puzzle inputs locally

### Solution Structure
Every solution file must export:
```typescript
export function part1(input: string[]): number {
    // Implementation
}

export function part2(input: string[]): number {
    // Implementation
}
```

### Modern TypeScript Setup
- All devDependencies are hoisted to root `package.json`
- Year workspaces only declare dependency on `@aoc/utils`
- TypeScript configured with `@tsconfig/node18` base and modern strict options
- Vitest for fast testing with native TypeScript support
- ESLint with type-aware rules and modern practices

## Common Patterns

When implementing solutions:
1. Use utilities to reduce boilerplate (see README.md utilities section for examples)
2. Input is always provided as `string[]` (one line per element)
3. Solutions must return numbers (or strings that coerce to numbers)
4. Check existing solutions in the same year for patterns and consistency

# AI Agent Quick Reference

## First Steps for AI Agents
When working with this project, ALWAYS start with these commands to understand the current state:

1. **`npm run aoc-status`** - Get project overview and identify what's available
2. **`npm run list-days [year]`** - See all implemented days and their status  
3. **`npm run help`** - Reference all available commands

## Common AI Agent Tasks

### Starting a New Day
```bash
npm run start-day <year> <day>    # Creates files + downloads input (one command!)
```

### Checking Before Solving
```bash
npm run check-day <year> <day>    # Validates everything is ready
```

### Running Solutions
```bash
npm run solve <year> <day>        # Run solution
npm test -- day-<DD>             # Run tests with filtering
```

### Discovery & Debugging
```bash
npm run aoc-status               # Project health check
npm run list-days 2024           # See what's implemented
npm run typecheck                # Check TypeScript
```

## File Patterns for AI Agents

### Predictable Structure
- Solutions: `src/<year>/day-<DD>.ts` (always zero-padded)
- Tests: `test/<year>/day-<DD>.spec.ts`
- Inputs: `src/<year>/inputs/day-<DD>.txt`
- Utils: `src/utils/` (shared across all years)

### Expected Exports
Every solution file must export:
```typescript
export function part1(input: string[]): number { }
export function part2(input: string[]): number { }
```

### Common Imports
```typescript
import { parseNumbers, Grid, sum, count } from '../utils';
```

## Error Handling for AI Agents
All commands provide actionable error messages with next steps:
- Missing files → Suggests correct setup command
- Build failures → Points to typecheck command
- Missing inputs → Shows fetch-input command

## Validation Workflow
1. `npm run check-day <year> <day>` - Verify setup
2. Edit solution file
3. `npm run solve <year> <day>` - Test solution
4. `npm test -- day-<DD>` - Run tests

## AI Agent Best Practices
- Always check project status first with `npm run aoc-status`
- Use `npm run check-day` before implementing solutions
- Leverage the utils library for common operations
- Test incrementally with `npm run solve <year> <day> 1` for part 1 only