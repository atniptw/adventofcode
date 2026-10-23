import { getOrThrow, sum } from '../utils/index.js';

export function parseEquation(line: string): { target: number; values: number[] } {
  const [lhs = '', rhs = ''] = line.split(': ');
  const target = Number(lhs);
  const values = rhs.split(' ').map(Number);
  return { target, values };
}

export function canSolve(target: number, values: number[], allowConcat = false): boolean {
  if (values.length === 1) return target === values.at(-1);

  const last = getOrThrow(values.at(-1));
  const remaining = values.slice(0, -1);
  const viaMultiply = target % last === 0 && canSolve(target / last, remaining, allowConcat);
  const viaAdd = target - last >= 0 && canSolve(target - last, remaining, allowConcat);
  const concatTarget = allowConcat ? unconcat(target, last) : undefined;
  const viaConcat = concatTarget !== undefined && canSolve(concatTarget, remaining, allowConcat);

  return viaMultiply || viaAdd || viaConcat;
}

export function unconcat(target: number, last: number): number | undefined {
  const t = String(target);
  const l = String(last);
  if (t.length > l.length && t.endsWith(l)) return Number(t.slice(0, -l.length));
  return undefined;
}

export function part1(input: string[]): number {
  return sum(
    input
      .map(parseEquation)
      .filter((equation) => canSolve(equation.target, equation.values))
      .map((equation) => equation.target)
  );
}

export function part2(input: string[]): number {
  return sum(
    input
      .map(parseEquation)
      .filter((equation) => canSolve(equation.target, equation.values, true))
      .map((equation) => equation.target)
  );
}
