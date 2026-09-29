import { parseNumbers, getOrThrow } from '../utils/index.js';

function buildJoltageChain(input: string[]): number[] {
  const numbers = parseNumbers(input);
  numbers.push(0);
  numbers.push(Math.max(...numbers) + 3);
  return numbers.sort((a, b) => a - b);
}

export function part1(input: string[]): number {
  const joltageChain = buildJoltageChain(input);
  const differences: number[] = [];
  for (let i = 0; i < joltageChain.length - 1; i++) {
    differences.push(getOrThrow(joltageChain[i + 1]) - getOrThrow(joltageChain[i]));
  }

  const ones = differences.filter((d) => d === 1).length;
  const threes = differences.filter((d) => d === 3).length;
  return ones * threes;
}

export function part2(input: string[]): number {
  const joltageChain = buildJoltageChain(input);

  const ways: Record<number, number> = {};
  ways[0] = 1;
  joltageChain.forEach((num) => {
    if (num === 0) return;
    ways[num] = (ways[num - 1] ?? 0) + (ways[num - 2] ?? 0) + (ways[num - 3] ?? 0);
  });

  return getOrThrow(ways[getOrThrow(joltageChain[joltageChain.length - 1])]);
}
