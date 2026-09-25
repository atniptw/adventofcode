import { getOrThrow, sum } from '../utils/index.js';

interface Bag {
  count: number;
  color: string;
}

function parseBagGraph(input: string[]): Map<string, Bag[]> {
  const graph = new Map<string, Bag[]>();
  input
    .map((line) => line.split(' bags contain '))
    .forEach((parts) => {
      const outer = getOrThrow(parts[0]);
      const contentsText = getOrThrow(parts[1]);
      graph.set(
        outer,
        [...contentsText.matchAll(/(\d+) (\w+ \w+) bags?/g)].map((m) => ({
          count: Number(getOrThrow(m[1])),
          color: getOrThrow(m[2]),
        }))
      );
    });
  return graph;
}

export function part1(input: string[]): number {
  const graph = parseBagGraph(input);

  function canReach(color: string): boolean {
    const contents = getOrThrow(graph.get(color));
    return contents.some((bag) => {
      if (bag.color === 'shiny gold') {
        return true;
      } else {
        return canReach(bag.color);
      }
    });
  }

  return [...graph.keys()].filter((color) => canReach(color)).length;
}

export function part2(input: string[]): number {
  const graph = parseBagGraph(input);

  function totalInside(color: string): number {
    const contents = getOrThrow(graph.get(color));
    return sum(contents.map((bag) => bag.count * (1 + totalInside(bag.color))));
  }

  return totalInside('shiny gold');
}
