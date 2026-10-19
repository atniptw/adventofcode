import { getOrThrow, parseNumberGrid } from '../utils/index.js';

function isSafe(report: number[]): boolean {
  const diffs = report.slice(1).map((level, i) => level - getOrThrow(report[i]));

  const asc = diffs.every((d) => d >= 1 && d <= 3);
  const desc = diffs.every((d) => d >= -3 && d <= -1);
  return asc || desc;
}

export function part1(input: string[]): number {
  return parseNumberGrid(input).filter((report) => isSafe(report)).length;
}

export function part2(input: string[]): number {
  return parseNumberGrid(input).filter((report) => {
    return isSafe(report) || report.some((_, i) => isSafe(report.filter((_, j) => j !== i)));
  }).length;
}
