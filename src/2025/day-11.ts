import { isDefined } from '../utils/index.js';

function parseInputToGraph(input: string[], graph: Record<string, string[]>): void {
  for (const line of input) {
    const [node, neighbors] = line.split(':').map((s) => s.trim());
    if (isDefined(node) && node?.length > 0) {
      graph[node] =
        isDefined(neighbors) && neighbors.length > 0
          ? neighbors
              .split(' ')
              .map((s) => s.trim())
              .filter(Boolean)
          : [];
    }
  }
}

// Build a reverse graph (edges reversed)
function buildReverseGraph(graph: Record<string, string[]>): Record<string, string[]> {
  const reverse: Record<string, string[]> = {};
  for (const [u, nbrs] of Object.entries(graph)) {
    for (const v of nbrs ?? []) {
      (reverse[v] ??= []).push(u);
    }
    reverse[u] ??= reverse[u] ?? [];
  }
  return reverse;
}

// Compute set of nodes that can reach a given end node
function computeCanReachEnd(graph: Record<string, string[]>, end: string): Set<string> {
  const reverse = buildReverseGraph(graph);
  const canReachEnd = new Set<string>();
  const stack = [end];
  while (stack.length) {
    const node = stack.pop()!;
    if (canReachEnd.has(node)) continue;
    canReachEnd.add(node);
    for (const prev of reverse[node] ?? []) {
      if (!canReachEnd.has(prev)) stack.push(prev);
    }
  }
  return canReachEnd;
}

// Generic path count on pruned DAG (nodes in canReachEnd)
function countPaths(
  graph: Record<string, string[]>,
  canReachEnd: Set<string>,
  source: string,
  target: string
): number {
  const pathCacheToTarget = new Map<string, number>();
  function dp(u: string): number {
    if (u === target) return 1;
    const hit = pathCacheToTarget.get(u);
    if (isDefined(hit)) return hit;
    let total = 0;
    for (const v of graph[u] ?? []) {
      if (!canReachEnd.has(v)) continue;
      total += dp(v);
    }
    pathCacheToTarget.set(u, total);
    return total;
  }
  return dp(source);
}

export function part1(input: string[]): number {
  const graph: Record<string, string[]> = {};
  parseInputToGraph(input, graph);

  const start = 'you';
  const end = 'out';

  const canReachEnd = computeCanReachEnd(graph, end);
  if (!canReachEnd.has(start)) return 0;

  return countPaths(graph, canReachEnd, start, end);
}

export function part2(input: string[]): number {
  const graph: Record<string, string[]> = {};
  parseInputToGraph(input, graph);

  const start = 'svr';
  const end = 'out';

  const canReachEnd = computeCanReachEnd(graph, end);
  if (!canReachEnd.has(start)) return 0;

  const orderDacThenFft =
    countPaths(graph, canReachEnd, start, 'dac') *
    countPaths(graph, canReachEnd, 'dac', 'fft') *
    countPaths(graph, canReachEnd, 'fft', end);
  const orderFftThenDac =
    countPaths(graph, canReachEnd, start, 'fft') *
    countPaths(graph, canReachEnd, 'fft', 'dac') *
    countPaths(graph, canReachEnd, 'dac', end);

  return orderDacThenFft + orderFftThenDac;
}
