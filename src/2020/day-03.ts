// import { parseNumbers, parseNumberGrid, parseCharGrid, Grid, frequency, count, sum } from '../utils/index.js';

export function part1(input: string[]): number {
  const rightStep = 3;
  const downStep = 1;
  let col = 0;
  let treeCount = 0;

  for (let row = downStep; row < input.length; row += downStep) {
    col += rightStep;
    const line = input[row];
    if (line === undefined || line.length === 0) continue;
    const cell = line[col % line.length];
    if (cell === '#') {
      treeCount++;
    }
  }

  return treeCount;
}

export function part2(_input: string[]): number {
  // TODO: Implement part 2
  return 0;
}
