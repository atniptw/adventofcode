export function sum(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

export function product(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc * n, 1);
}
