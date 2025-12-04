const NEIGHBOR_OFFSETS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

function isValidPosition(matrix: readonly string[][], r: number, c: number): boolean {
  return r >= 0 && r < matrix.length && c >= 0 && c < matrix[r]!.length;
}

function countAtNeighbors(matrix: readonly string[][], r: number, c: number): number {
  return NEIGHBOR_OFFSETS.reduce((count, [dr, dc]) => {
    const nr = r + dr;
    const nc = c + dc;
    return count + (isValidPosition(matrix, nr, nc) && matrix[nr]![nc] === '@' ? 1 : 0);
  }, 0);
}

export function translate(input: string[]): string[] {
  const matrix = input.map((line) => line.split(''));

  return matrix.map((row, r) =>
    row.map((char, c) => (char === '@' && countAtNeighbors(matrix, r, c) < 4 ? 'x' : char)).join('')
  );
}

export function part1(input: string[]): number {
  const translated = translate(input);
  return translated.reduce((count, line) => count + (line.match(/x/g)?.length ?? 0), 0);
}

export function part2(input: string[]): number {
  let matrix = input;
  let count = 0;
  let prevCount: number;

  do {
    prevCount = count;
    matrix = translate(matrix);
    count = matrix.reduce((sum, line) => sum + (line.match(/x/g)?.length ?? 0), 0);
  } while (count !== prevCount);

  return count;
}
