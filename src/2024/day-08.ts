import { getOrThrow } from '../utils/index.js';

type Point = [number, number];

function findAntennas(input: string[]): Map<string, Point[]> {
  const frequencies = new Map<string, Point[]>();

  for (const [r, line] of input.entries()) {
    for (const [c, ch] of [...line].entries()) {
      if (ch !== '.') {
        const list = frequencies.get(ch) ?? [];
        list.push([r, c]);
        frequencies.set(ch, list);
      }
    }
  }

  return frequencies;
}

function inBounds(map: string[], [r, c]: Point): boolean {
  return r >= 0 && c >= 0 && r < map.length && c < getOrThrow(map[r]).length;
}

function walk(map: string[], [r, c]: Point, dr: number, dc: number): Point[] {
  const points: Point[] = [];
  for (let step = 0; inBounds(map, [r + dr * step, c + dc * step]); step++) {
    points.push([r + dr * step, c + dc * step]);
  }
  return points;
}

function countAntinodes(input: string[], antinodesOf: (a: Point, b: Point) => Point[]): number {
  const antinodes = new Set<string>();

  for (const points of findAntennas(input).values()) {
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        for (const [r, c] of antinodesOf(getOrThrow(points[i]), getOrThrow(points[j]))) {
          if (inBounds(input, [r, c])) antinodes.add(`${r},${c}`);
        }
      }
    }
  }
  return antinodes.size;
}

export function part1(input: string[]): number {
  return countAntinodes(input, ([r1, c1], [r2, c2]) => {
    const dr = r2 - r1;
    const dc = c2 - c1;
    return [
      [r2 + dr, c2 + dc],
      [r1 - dr, c1 - dc],
    ];
  });
}

export function part2(input: string[]): number {
  return countAntinodes(input, ([r1, c1], [r2, c2]) => {
    const dr = r2 - r1;
    const dc = c2 - c1;
    return [...walk(input, [r2, c2], dr, dc), ...walk(input, [r1, c1], -dr, -dc)];
  });
}
