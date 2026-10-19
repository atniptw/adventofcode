import { getOrThrow } from '../utils/index.js';

export function part1(input: string[]): number {
  const memory = input.join('\n');
  const matches = memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return matches
    .map((m) => parseInt(getOrThrow(m[1])) * parseInt(getOrThrow(m[2])))
    .reduce((sum, product) => sum + product, 0);
}

export function part2(input: string[]): number {
  const memory = input.join('\n');
  const matches = memory.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g);
  let enabled = true;
  return matches
    .filter((m) => {
      if (m[0] === 'do()') {
        enabled = true;
        return false;
      }
      if (m[0] === "don't()") {
        enabled = false;
        return false;
      }
      return enabled;
    })
    .map((m) => parseInt(getOrThrow(m[1])) * parseInt(getOrThrow(m[2])))
    .reduce((sum, product) => sum + product, 0);
}
