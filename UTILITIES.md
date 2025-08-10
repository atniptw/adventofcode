# Utilities Reference

This repository includes a comprehensive set of utilities to reduce code duplication and make Advent of Code solutions more concise and reusable.

## Parsing Utilities

### `parseNumbers(input: string[]): number[]`
Parse lines of input where each line contains a single number.
```typescript
const numbers = parseNumbers(['1', '42', '7']); // [1, 42, 7]
```

### `parseNumberGrid(input: string[], separator?: string): number[][]`
Parse lines where each line contains space-separated numbers.
```typescript
const grid = parseNumberGrid(['1 2 3', '4 5 6']); // [[1,2,3], [4,5,6]]
const columns = parseNumberGrid(['1   2', '3   4'], '   '); // For custom separators
```

### `parseNumberColumns(input: string[], separator?: string): number[][]`
Parse input into columns instead of rows.
```typescript
const columns = parseNumberColumns(['1 4', '2 5', '3 6']); // [[1,2,3], [4,5,6]]
```

### `parseCharGrid(input: string[]): string[][]`
Parse input into a 2D character array.
```typescript
const grid = parseCharGrid(['ABC', 'DEF']); // [['A','B','C'], ['D','E','F']]
```

### `joinLines(input: string[]): string`
Join all input lines into a single string.
```typescript
const text = joinLines(['Hello', 'World']); // 'HelloWorld'
```

## Grid Utilities

### `Grid<T>` Class
A powerful 2D grid class with many useful methods.

```typescript
// Create from strings
const grid = Grid.fromStrings(['ABC', 'DEF']);

// Basic properties
grid.rows;     // 2
grid.cols;     // 3

// Get/set values
const point = { row: 0, col: 1 };
grid.get(point);           // 'B' 
grid.set(point, 'X');      // Set position to 'X'
grid.isInBounds(point);    // true

// Find elements
grid.findAll(val => val === 'A');          // [{ row: 0, col: 0 }]
grid.findFirst(val => val === 'B');        // { row: 0, col: 1 }

// Navigation
const neighbors = grid.getNeighbors(point, true);  // Include diagonals
const rightPoint = grid.getNeighbor(point, 'right');

// Get sequences
const line = grid.getLine(point, 'down', 3);  // ['B', 'E', ...]

// Search for words (for word search puzzles)
grid.countWordOccurrences('WORD');  // Count occurrences in all directions

// Iteration
grid.forEach((value, point) => { /* ... */ });
const newGrid = grid.map((value, point) => value.toLowerCase());

// Utility
const copy = grid.clone();
const string = grid.toString();
```

## Math Utilities

### Basic operations
```typescript
sum([1, 2, 3]);        // 6
product([2, 3, 4]);    // 24
min([5, 2, 8]);        // 2
max([5, 2, 8]);        // 8
```

### Array utilities
```typescript
count([1, 2, 1, 3], x => x === 1);     // 2
frequency([1, 2, 1, 3]);               // Map: 1 → 2, 2 → 1, 3 → 1

// Check if array is sorted with optional max difference
isAscending([1, 3, 5], 3);      // true (max diff of 3)
isDescending([5, 3, 1], 3);     // true
isSorted([1, 2, 4], 3);         // true (ascending or descending)

// Array manipulation
removeAt([1, 2, 3], 1);         // [1, 3]
```

## Common Patterns

### Day 1 style (two columns of numbers)
```typescript
function parseInput(input: string[]): [number[], number[]] {
    const columns = parseNumberColumns(input, '   ');
    return [columns[0], columns[1]];
}

const [left, right] = parseInput(input);
const freq = frequency(right);
```

### Day 2 style (safety checking)
```typescript
const reports = parseNumberGrid(input);
const safeReports = count(reports, report => isSorted(report, 3));
```

### Day 3 style (pattern matching)
```typescript
const text = joinLines(input);
const matches = text.match(/pattern/g) || [];
```

### Day 4 style (word search)
```typescript
const grid = Grid.fromStrings(input);
const wordCount = grid.countWordOccurrences('WORD');
```

### Grid traversal
```typescript
const grid = Grid.fromStrings(input);
const startPoints = grid.findAll(cell => cell === 'S');

startPoints.forEach(start => {
    const neighbors = grid.getNeighbors(start);
    // Process neighbors...
});
```

## Integration with Existing Solutions

Your existing solutions have been refactored to use these utilities:

- **Day 1**: Now uses `parseNumberColumns()` and `frequency()`
- **Day 2**: Now uses `parseNumberGrid()`, `isSorted()`, and `count()`  
- **Day 3**: Now uses `joinLines()` and functional patterns
- **Day 4**: Now uses `Grid.fromStrings()` and `countWordOccurrences()`

The refactored solutions are more concise, readable, and share common logic through utilities.