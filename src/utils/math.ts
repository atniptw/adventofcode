export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

export function product(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc * n, 1);
}

export function min(numbers: number[]): number {
  return Math.min(...numbers);
}

export function max(numbers: number[]): number {
  return Math.max(...numbers);
}

export function count<T>(array: T[], predicate: (item: T) => boolean): number {
  return array.filter(predicate).length;
}

export function frequency<T>(array: T[]): Map<T, number> {
  const freq = new Map<T, number>();
  array.forEach((item) => {
    const count = freq.get(item);
    freq.set(item, (count ?? 0) + 1);
  });
  return freq;
}

export function isAscending(numbers: number[], maxDiff?: number): boolean {
  return numbers.every((current, index) => {
    if (index === 0) return true;
    const prev = numbers[index - 1];
    if (prev === undefined) return false;
    const diff = current - prev;
    return diff > 0 && (maxDiff === undefined || diff <= maxDiff);
  });
}

export function isDescending(numbers: number[], maxDiff?: number): boolean {
  return numbers.every((current, index) => {
    if (index === 0) return true;
    const prev = numbers[index - 1];
    if (prev === undefined) return false;
    const diff = prev - current;
    return diff > 0 && (maxDiff === undefined || diff <= maxDiff);
  });
}

export function isSorted(numbers: number[], maxDiff?: number): boolean {
  return isAscending(numbers, maxDiff) || isDescending(numbers, maxDiff);
}

export function removeAt<T>(array: T[], index: number): T[] {
  const result = [...array];
  result.splice(index, 1);
  return result;
}
