const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

function safeGet(puzzle: string[], row: number, col: number): string {
  return puzzle[row]?.[col] ?? '';
}

export function part1(input: string[]): number {
  let count = 0;
  for (const [row, line] of input.entries()) {
    for (let col = 0; col < line.length; col++) {
      for (const [dr, dc] of DIRECTIONS) {
        if ([...'XMAS'].every((ch, i) => ch === safeGet(input, row + dr * i, col + dc * i))) {
          count++;
        }
      }
    }
  }
  return count;
}

export function part2(input: string[]): number {
  let count = 0;
  const MS = new Set(['MS', 'SM']);
  for (const [row, line] of input.entries()) {
    for (let col = 0; col < line.length; col++) {
      const diag1 = safeGet(input, row - 1, col - 1) + safeGet(input, row + 1, col + 1);
      const diag2 = safeGet(input, row - 1, col + 1) + safeGet(input, row + 1, col - 1);
      if (safeGet(input, row, col) === 'A' && MS.has(diag1) && MS.has(diag2)) count++;
    }
  }
  return count;
}
