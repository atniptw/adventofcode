import { getOrThrow } from '../utils/index.js';

type Point = { x: number; y: number };

const dirs: Point[] = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
];

function getGuard(map: string[]): Point | undefined {
  for (const [y, line] of map.entries()) {
    const x = line.search(/[<^>v]/);
    if (x !== -1) {
      return { x, y };
    }
  }
  return undefined;
}

function onMap(map: string[], point: Point): boolean {
  return (
    point.x > -1 &&
    point.y > -1 &&
    point.y < map.length &&
    point.x < getOrThrow(map[point.y]).length
  );
}

function walkMap(map: string[], start: Point, obstacle?: Point): Point[] | undefined {
  const width = getOrThrow(map[0]).length;
  const visited = new Map<number, Point>();
  const seen = new Set<number>();

  let { x, y } = start;
  let dir = 0;
  while (onMap(map, { x, y })) {
    const square = y * width + x;
    const state = square * 4 + dir;
    if (seen.has(state)) return undefined;
    seen.add(state);
    if (!visited.has(square)) visited.set(square, { x, y });

    const direction = getOrThrow(dirs[dir]);
    const nx = x + direction.x;
    const ny = y + direction.y;
    const blocked = map[ny]?.[nx] === '#' || (nx === obstacle?.x && ny === obstacle?.y);
    if (blocked) {
      dir = (dir + 1) % 4;
    } else {
      x = nx;
      y = ny;
    }
  }

  return [...visited.values()];
}

export function part1(input: string[]): number {
  const start = getOrThrow(getGuard(input));
  return getOrThrow(walkMap(input, start)).length;
}

export function part2(input: string[]): number {
  const start = getOrThrow(getGuard(input));
  const candidates = getOrThrow(walkMap(input, start)).slice(1);
  return candidates.filter((obstacle) => walkMap(input, start, obstacle) === undefined).length;
}
