# Advent of Code Solutions

A monorepo for [Advent of Code](https://adventofcode.com/) solutions with shared utilities and streamlined development workflow.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create a new year (e.g., 2025)
npm run setup 2025

# Run a solution
npm run solve 2024 1    # Both parts
npm run solve 2024 1 1  # Part 1 only  
npm run solve 2024 1 2  # Part 2 only
```

## 📁 Structure

```
advent-of-code/
├── packages/
│   └── aoc-utils/              # Shared utilities (Grid, parsing, math)
├── years/                      # Year-specific solutions
│   ├── 2024/
│   └── 2023/
├── scripts/                    # Runner and setup scripts
└── template/                   # Template for new years
```

## 🛠️ Development

### Adding Solutions

1. **Add input:** Copy your puzzle input to `years/2024/src/inputs/day-01.txt`
2. **Implement:** Edit `years/2024/src/day-01.ts` using shared utilities
3. **Run:** `npm run solve 2024 1`

### Shared Utilities

All solutions have access to `@aoc/utils`:

```typescript
import { parseNumbers, Grid, frequency, count } from '@aoc/utils';

export function part1(input: string[]): number {
    const grid = Grid.fromStrings(input);
    return grid.countWordOccurrences('WORD');
}
```

See [UTILITIES.md](UTILITIES.md) for complete reference.

## ⚠️ Input Files Policy

**IMPORTANT:** The Advent of Code creator has requested that puzzle inputs NOT be shared publicly.

- ✅ **Protected:** All `.txt` files in `inputs/` directories are automatically ignored by git
- ✅ **Safe:** You can run `git add .` without risk of committing input files  
- ✅ **Personal:** Add your own puzzle inputs locally - they won't be committed

## 📋 Available Commands

```bash
# Solutions
npm run solve <year> <day> [part]   # Run specific solution
npm run setup <year>                # Create new year workspace

# Development  
npm run build                       # Build all workspaces
npm run test                        # Test all workspaces
npm run lint                        # Lint all workspaces
npm run clean                       # Clean build artifacts

# Workspace-specific
npm run build -w @aoc/2024          # Build specific year
npm run test -w @aoc/utils          # Test utilities only
```

## 🏗️ Monorepo Benefits

- **Shared utilities** across all years
- **Hoisted dependencies** for faster installs
- **Consistent tooling** and patterns
- **Easy execution** from repository root
- **Type safety** with TypeScript throughout

## 📚 Documentation

- [USAGE.md](USAGE.md) - Detailed usage guide
- [UTILITIES.md](UTILITIES.md) - Complete utilities reference
