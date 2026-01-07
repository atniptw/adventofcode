// import { parseNumbers, parseNumberGrid, parseCharGrid, Grid, frequency, count, sum } from '../utils/index.js';

export function part1(input: string[]): number {
  let niceCount = 0;
  for (const line of input) {
    const vowels = line.match(/[aeiou]/g)?.length ?? 0;
    const hasDouble = /(.)\1/.test(line);
    const hasNaughty = /(ab|cd|pq|xy)/.test(line);

    if (vowels >= 3 && hasDouble && !hasNaughty) {
      niceCount++;
    }
  }
  return niceCount;
}

export function part2(input: string[]): number {
  let niceCount = 0;
  for (const line of input) {
    const hasPair = /(..).*\1/.test(line);
    const hasRepeat = /(.).\1/.test(line);

    if (hasPair && hasRepeat) {
      niceCount++;
    }
  }
  return niceCount;
}
