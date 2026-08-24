function countTrees(input: string[], rightStep: number, downStep: number): number {
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

export function part1(input: string[]): number {
  return countTrees(input, 3, 1);
}

export function part2(input: string[]): number {
  const slopes: Array<[number, number]> = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes.reduce((product, [right, down]) => product * countTrees(input, right, down), 1);
}
