import { getOrThrow } from '../utils/index.js';

const LINE_PATTERN = /^(\d+)-(\d+) (\w): (\w+)$/;

export function part1(input: string[]): number {
  return input.filter((line) => {
    const match = getOrThrow(LINE_PATTERN.exec(line), `Unparseable line: ${line}`);
    const min = Number(getOrThrow(match[1]));
    const max = Number(getOrThrow(match[2]));
    const letter = getOrThrow(match[3]);
    const password = getOrThrow(match[4]);

    const count = password.split('').filter((c) => c === letter).length;
    return count >= min && count <= max;
  }).length;
}

export function part2(input: string[]): number {
  return input.filter((line) => {
    const match = getOrThrow(LINE_PATTERN.exec(line), `Unparseable line: ${line}`);
    const first = Number(getOrThrow(match[1]));
    const second = Number(getOrThrow(match[2]));
    const letter = getOrThrow(match[3]);
    const password = getOrThrow(match[4]);

    const firstMatches = password[first - 1] === letter;
    const secondMatches = password[second - 1] === letter;
    return firstMatches !== secondMatches;
  }).length;
}
