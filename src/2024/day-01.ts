import { parseNumberGrid } from '../utils/index.js';

function parseInput(input: string[]) {
  const data = parseNumberGrid(input);
  const left: number[] = [];
  const right: number[] = [];

  data.forEach((line: (number | undefined)[]) => {
    const [l, r] = line;
    left.push(l!);
    right.push(r!);
  });

  return { left, right };
}

function countOccurrences(arr: number[], num: number): number {
  return arr.reduce((count, x) => count + (x === num ? 1 : 0), 0);
}

export function part1(input: string[]): number {
  const { left, right } = parseInput(input);

  left.sort((a, b) => a - b);
  right.sort((a, b) => a - b);

  let sum = 0;
  const n = Math.min(left.length, right.length);
  for (let i = 0; i < n; i++) {
    const l = left[i]!;
    const r = right[i]!;
    sum += Math.abs(l - r);
  }
  return sum;
}

export function part2(input: string[]): number {
  const { left, right } = parseInput(input);

  let sum = 0;
  left.forEach((element) => {
    const countInRight = countOccurrences(right, element);
    sum += countInRight * element;
  });

  return sum;
}
