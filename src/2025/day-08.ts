import { parseNumberGrid, product } from '../utils/index.js';

type Vec3 = [number, number, number];

function dist(a: Vec3, b: Vec3): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function buildClosestPairs(
  points: Vec3[]
): Array<{ fromIndex: number; toIndex: number; distance: number }> {
  const pointCount = points.length;
  const pairs: Array<{ fromIndex: number; toIndex: number; distance: number }> = [];
  for (let fromIndex = 0; fromIndex < pointCount; fromIndex++) {
    for (let toIndex = fromIndex + 1; toIndex < pointCount; toIndex++) {
      pairs.push({ fromIndex, toIndex, distance: dist(points[fromIndex]!, points[toIndex]!) });
    }
  }
  pairs.sort((a, b) => a.distance - b.distance);
  return pairs;
}

function connectByClosest(points: Vec3[], iterations: number): number[][] {
  const pointCount = points.length;
  const adjacency: number[][] = Array.from({ length: pointCount }, () => []);
  const closestPairs = buildClosestPairs(points);
  let edgesAdded = 0;
  for (let pairIndex = 0; pairIndex < closestPairs.length && edgesAdded < iterations; pairIndex++) {
    const { fromIndex, toIndex } = closestPairs[pairIndex]!;
    if (fromIndex === toIndex) continue;
    if (adjacency[fromIndex]!.includes(toIndex) || adjacency[toIndex]!.includes(fromIndex))
      continue;
    adjacency[fromIndex]!.push(toIndex);
    adjacency[toIndex]!.push(fromIndex);
    edgesAdded++;
  }
  return adjacency;
}

function components(adjacency: number[][]): number[][] {
  const nodeCount = adjacency.length;
  const visited = new Array(nodeCount).fill(false);
  const componentList: number[][] = [];
  const stack: number[] = [];
  for (let startNode = 0; startNode < nodeCount; startNode++) {
    if (visited[startNode] === true) continue;
    const component: number[] = [];
    stack.push(startNode);
    visited[startNode] = true;
    while (stack.length) {
      const node = stack.pop()!;
      component.push(node);
      for (const neighbor of adjacency[node]!) {
        if (visited[neighbor] === false) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }
    componentList.push(component);
  }
  return componentList;
}

function addEdgesUntilConnected(points: Vec3[]): { fromIndex: number; toIndex: number } | null {
  const pointCount = points.length;
  if (pointCount <= 1) return null;
  const closestPairs = buildClosestPairs(points);
  const adjacency: number[][] = Array.from({ length: pointCount }, () => []);
  let lastPair: { fromIndex: number; toIndex: number } | null = null;
  for (let pairIndex = 0; pairIndex < closestPairs.length; pairIndex++) {
    const { fromIndex, toIndex } = closestPairs[pairIndex]!;
    if (fromIndex === toIndex) continue;
    if (adjacency[fromIndex]!.includes(toIndex)) continue;
    adjacency[fromIndex]!.push(toIndex);
    adjacency[toIndex]!.push(fromIndex);
    lastPair = { fromIndex, toIndex };
    const comps = components(adjacency);
    if (comps.length === 1) break;
  }
  return lastPair;
}

export function part1(input: string[], iterations: number = 1000): number {
  const rows = parseNumberGrid(input, ',');
  const points: Vec3[] = rows.map((r) => [r[0] ?? 0, r[1] ?? 0, r[2] ?? 0]);
  if (points.length === 0) return 0;
  const adj = connectByClosest(points, iterations);
  const comps = components(adj);
  const sizes = comps.map((c) => c.length).sort((a, b) => b - a);
  const top3 = sizes.slice(0, 3);
  return product(top3.length ? top3 : [0]);
}

export function part2(_input: string[]): number {
  const rows = parseNumberGrid(_input, ',');
  const points: Vec3[] = rows.map((row) => [row[0] ?? 0, row[1] ?? 0, row[2] ?? 0]);
  if (points.length === 0) return 0;
  if (points.length === 1) return points[0]![0];
  const lastPair = addEdgesUntilConnected(points);
  if (!lastPair) return 0;
  return points[lastPair.fromIndex]![0] * points[lastPair.toIndex]![0];
}
