import { parseNumberGrid } from '../utils/parsing.js';
import { isDefined } from '../utils/index.js';

function areaOfBox(x1: number, y1: number, x2: number, y2: number): number {
  return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
}

export function part1(input: string[]): number {
  const points = parseNumberGrid(input, ',');

  let maxArea = 0;
  const validPoints = points.filter((p) => isDefined(p) && p.length >= 2) as Array<
    [number, number]
  >;
  for (const [x1, y1] of validPoints) {
    for (const [x2, y2] of validPoints) {
      const rectArea = areaOfBox(x1, y1, x2, y2);
      if (rectArea > maxArea) maxArea = rectArea;
    }
  }

  return maxArea;
}

export function part2(_input: string[]): number {
  return 0;
}
