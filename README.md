# 🎄 Advent of Code Solutions

A streamlined TypeScript project for [Advent of Code](https://adventofcode.com/) solutions with comprehensive utilities, AI-agent friendly tooling, and automated input management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start working on a new day (creates files + downloads input)
npm run start-day 2024 5

# Check project status anytime
npm run aoc-status

# Run your solution
npm run solve 2024 5
```

## 🎯 Key Features

- **🤖 AI-Agent Friendly** - Self-documenting commands with comprehensive status reporting
- **⚡ Lightning Fast** - Vitest for instant test feedback
- **🧰 Rich Utilities** - Grid operations, parsing, math functions, and more
- **🔒 Input Protection** - Automatic input file management respecting AoC creator's wishes
- **📊 Visual Status** - Clear progress tracking with emoji-based feedback
- **🎨 Modern Stack** - TypeScript, ESM, strict typing throughout

## 📁 Project Structure

```
advent-of-code/
├── src/
│   ├── utils/              # Shared utilities (Grid, parsing, math)
│   ├── 2023/               # 2023 solutions and inputs
│   └── 2024/               # 2024 solutions and inputs
├── test/
│   ├── 2023/               # 2023 tests
│   └── 2024/               # 2024 tests
├── scripts/                # Tooling and automation
└── package.json           # Single package configuration
```

## 🎮 Commands

### 🔍 Discovery & Status
```bash
npm run aoc-status          # Complete project overview
npm run list-days [year]    # Detailed day-by-day status  
npm run check-day <year> <day>  # Validate specific day
npm run help                # All available commands
```

### 🛠️ Development
```bash
npm run start-day <year> <day>  # Create files + download input
npm run solve <year> <day>      # Run solution (both parts)
npm run solve <year> <day> 1    # Run part 1 only
npm run fetch-input <year> <day> # Download/re-download input
```

### 🧪 Testing & Quality
```bash
npm test                    # Run all tests
npm test -- day-05          # Run tests for specific day
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
npm run lint                # Code style check
npm run typecheck           # TypeScript validation
```

## 💻 Development Workflow

### Starting a New Day

```bash
# This single command does everything:
npm run start-day 2024 12
```

**What it does:**
1. ✅ Creates `src/2024/day-12.ts` with helpful template
2. ✅ Creates `test/2024/day-12.spec.ts` with test structure  
3. ✅ Creates empty `src/2024/inputs/day-12.txt`
4. ✅ Downloads your puzzle input from adventofcode.com
5. ✅ Shows next steps

### Implementing Solutions

Edit the generated file using our rich utilities:

```typescript
// src/2024/day-12.ts
import { parseNumberGrid, Grid, frequency, count, sum } from '../utils';

export function part1(input: string[]): number {
    // Use utilities for common patterns
    const grid = Grid.fromStrings(input);
    const startPoints = grid.findAll(cell => cell === 'S');
    
    return startPoints.length;
}

export function part2(input: string[]): number {
    const numbers = parseNumberGrid(input);
    return sum(numbers.flat());
}
```

### Running & Testing

```bash
# Run your solution
npm run solve 2024 12

# Test with sample data
npm test -- day-12

# Check everything is ready
npm run check-day 2024 12
```

## 🧰 Utilities Reference

### Parsing Utilities

```typescript
import { parseNumbers, parseNumberGrid, parseCharGrid, joinLines } from '../utils';

// Single numbers per line
const numbers = parseNumbers(['1', '42', '7']); // [1, 42, 7]

// Space-separated numbers
const grid = parseNumberGrid(['1 2 3', '4 5 6']); // [[1,2,3], [4,5,6]]

// Character grid
const chars = parseCharGrid(['ABC', 'DEF']); // [['A','B','C'], ['D','E','F']]

// Join all lines
const text = joinLines(['Hello', 'World']); // 'HelloWorld'
```

### Grid Operations

```typescript
import { Grid } from '../utils';

// Create and manipulate grids
const grid = Grid.fromStrings(['ABC', 'DEF']);

// Navigation and search
const neighbors = grid.getNeighbors({row: 0, col: 1});
const allAs = grid.findAll(cell => cell === 'A');
const firstB = grid.findFirst(cell => cell === 'B');

// Word search (perfect for many AoC puzzles)
const wordCount = grid.countWordOccurrences('WORD');

// Iteration with position awareness
grid.forEach((value, {row, col}) => {
    console.log(`${value} at (${row}, ${col})`);
});
```

### Math & Array Utilities

```typescript
import { sum, product, count, frequency, isSorted } from '../utils';

// Basic math
const total = sum([1, 2, 3]);           // 6
const result = product([2, 3, 4]);      // 24

// Array analysis
const freq = frequency([1, 2, 1, 3]);   // Map: 1→2, 2→1, 3→1
const safe = count(reports, r => isSorted(r, 3)); // Count sorted arrays

// Safety checking (common in AoC)
const isSafe = isSorted([1, 3, 5], 3);  // true (max diff of 3)
```

### Common Patterns

```typescript
// Day 1 style (two columns)
const [left, right] = parseNumberColumns(input, '   ');
const frequencies = frequency(right);

// Day 2 style (safety checking)  
const reports = parseNumberGrid(input);
const safeCount = count(reports, report => isSorted(report, 3));

// Day 4 style (word search)
const grid = Grid.fromStrings(input);
const xmasCount = grid.countWordOccurrences('XMAS');
```

## 🤖 AI Agent Features

This project is optimized for AI agents with:

### Self-Discovery Commands
- `npm run aoc-status` - Instant project understanding
- `npm run list-days` - Visual progress overview  
- `npm run check-day` - Comprehensive validation

### Actionable Error Messages
Every error includes the exact command to fix it:
```
❌ Solution file not found
💡 Create it with: npm run start-day 2024 5
📋 Check status: npm run check-day 2024 5
```

### Predictable Patterns
- Solutions: `src/<year>/day-<DD>.ts`
- Tests: `test/<year>/day-<DD>.spec.ts`  
- Inputs: `src/<year>/inputs/day-<DD>.txt`
- Always exports `part1(input: string[]): number` and `part2`

## 📥 Input Management

### Automatic Download
```bash
npm run start-day 2024 5    # Downloads input automatically
npm run fetch-input 2024 5  # Re-download if needed
```

### Session Setup
1. Visit [adventofcode.com](https://adventofcode.com) and log in
2. Open DevTools (F12) → Application → Cookies
3. Copy the "session" cookie value
4. Create `.env` file: `AOC_SESSION=your_session_token_here`

### Input Protection
**IMPORTANT:** Puzzle inputs are never committed to git (per AoC creator's request)
- ✅ All `*.txt` files in `inputs/` directories are auto-ignored
- ✅ You can safely run `git add .` without risk
- ✅ Each developer manages their own inputs locally

## 🏗️ Architecture

### Modern TypeScript Setup
- **ES Modules** throughout
- **Strict TypeScript** with `@tsconfig/node18`
- **Vitest** for fast testing with native TypeScript support
- **ESLint + Prettier** for consistent code style

### Single Package Benefits
- **Simplified structure** - No complex workspace configuration
- **Unified dependencies** - Single `package.json` and lockfile
- **Easy navigation** - Everything in predictable locations
- **Fast operations** - No cross-package complexity

### Rich Tooling
- **Visual feedback** with emoji status indicators
- **Comprehensive validation** before solving
- **Flexible test filtering** by day, year, or pattern
- **Development workflow** optimized for rapid iteration

## 🚀 Getting Started

1. **Clone and install:**
   ```bash
   git clone <repository>
   cd advent-of-code
   npm install
   ```

2. **Set up session (optional but recommended):**
   ```bash
   echo "AOC_SESSION=your_session_token" > .env
   ```

3. **Check status:**
   ```bash
   npm run aoc-status
   ```

4. **Start solving:**
   ```bash
   npm run start-day 2024 1
   # Edit src/2024/day-01.ts
   npm run solve 2024 1
   ```

## 📚 Examples

### Complete Day 1 Example
```typescript
// src/2024/day-01.ts
import { parseNumberColumns, frequency, sum } from '../utils';

export function part1(input: string[]): number {
    const [left, right] = parseNumberColumns(input, '   ');
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    
    return sum(left.map((l, i) => Math.abs(l - right[i])));
}

export function part2(input: string[]): number {
    const [left, right] = parseNumberColumns(input, '   ');
    const freq = frequency(right);
    
    return sum(left.map(num => num * (freq.get(num) || 0)));
}
```

### Grid-Based Solution
```typescript
// src/2024/day-04.ts  
import { Grid } from '../utils';

export function part1(input: string[]): number {
    const grid = Grid.fromStrings(input);
    return grid.countWordOccurrences('XMAS');
}

export function part2(input: string[]): number {
    const grid = Grid.fromStrings(input);
    const centers = grid.findAll(cell => cell === 'A');
    
    return centers.filter(center => {
        const diag1 = grid.getLine(center, 'up-left', 1) + 'A' + grid.getLine(center, 'down-right', 1);
        const diag2 = grid.getLine(center, 'up-right', 1) + 'A' + grid.getLine(center, 'down-left', 1);
        return ['MAS', 'SAM'].includes(diag1) && ['MAS', 'SAM'].includes(diag2);
    }).length;
}
```

## 🎯 Tips for Success

- **Start each day with `npm run start-day <year> <day>`**
- **Use `npm run aoc-status` to understand the project state**
- **Leverage utilities** - they handle common AoC patterns
- **Test incrementally** with `npm test -- day-XX`
- **Check validation** with `npm run check-day` before solving
- **Use part-specific solving** with `npm run solve <year> <day> 1`

Happy coding! 🎄✨