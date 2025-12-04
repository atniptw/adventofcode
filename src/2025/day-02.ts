function parseRange(input: string): [number, number] | null {
  const parts = input.split('-').map(Number);
  const start = parts[0];
  const end = parts[1];

  if (start === undefined || end === undefined) {
    return null;
  }

  return [start, end];
}

export function hasExactHalfMatch(numStr: string): boolean {
  const length = numStr.length;
  const firstHalf = numStr.slice(0, length / 2);
  const secondHalf = numStr.slice(length / 2);
  return firstHalf === secondHalf;
}

export function hasRepeatedPattern(numStr: string): boolean {
  const length = numStr.length;

  // Try all possible pattern lengths (divisors of the total length)
  for (let patternLen = 1; patternLen <= length / 2; patternLen++) {
    if (length % patternLen === 0) {
      const pattern = numStr.slice(0, patternLen);
      const reconstructed = pattern.repeat(length / patternLen);

      if (reconstructed === numStr) {
        return true;
      }
    }
  }

  return false;
}

function findInvalidNumbers(input: string, predicate: (numStr: string) => boolean): number[] {
  const range = parseRange(input);
  if (!range) return [];

  const [start, end] = range;
  const invalidNumbers: number[] = [];

  for (let num = start; num <= end; num++) {
    if (predicate(num.toString())) {
      invalidNumbers.push(num);
    }
  }

  return invalidNumbers;
}

function sumInvalidNumbers(input: string[], finder: (range: string) => number[]): number {
  return input
    .flatMap((line) => line.split(','))
    .flatMap(finder)
    .reduce((sum, num) => sum + num, 0);
}

export function part1(input: string[]): number {
  return sumInvalidNumbers(input, (range) => findInvalidNumbers(range, hasExactHalfMatch));
}

export function part2(input: string[]): number {
  return sumInvalidNumbers(input, (range) => findInvalidNumbers(range, hasRepeatedPattern));
}
