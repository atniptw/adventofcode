type Cell = '.' | '^' | 'S' | string;

function simulatePaths(input: string[]) {
  const rows = input.length;
  const cols = input[0]?.length ?? 0;
  const reach: number[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0)
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = input[r]![c]! as Cell;

      // Seed the flow at S
      if (cell === 'S') {
        reach[r]![c] = 1;
      }

      const flow = reach[r]![c]!;
      if (flow === 0) continue;

      if (cell === 'S' || cell === '.') {
        if (r + 1 < rows) reach[r + 1]![c]! += flow; // straight down
      } else if (cell === '^') {
        // Flow hits a splitter: fan out diagonally
        if (r + 1 < rows && c > 0) reach[r + 1]![c - 1]! += flow;
        if (r + 1 < rows && c + 1 < cols) reach[r + 1]![c + 1]! += flow;
      }
    }
  }

  let reachedDistinct = 0;
  let reachedTotal = 0;
  let bottomTotal = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cellReach = reach[r]?.[c] ?? 0;
      if (input[r]![c] === '^' && cellReach > 0) {
        reachedDistinct++;
        reachedTotal += cellReach;
      }
    }
  }

  if (rows > 0) {
    bottomTotal = reach[rows - 1]!.reduce((acc, val) => acc + val, 0);
  }

  return { reachedDistinct, reachedTotal, bottomTotal };
}

export function part1(input: string[]): number {
  return simulatePaths(input).reachedDistinct;
}

export function part2(input: string[]): number {
  return simulatePaths(input).bottomTotal;
}
