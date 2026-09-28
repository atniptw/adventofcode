import { getOrThrow, parseNumbers } from '../utils/index.js';

export function findFirstInvalid(numbers: number[], preambleLength: number): number {
  for (let i = preambleLength; i < numbers.length; i++) {
    const window = numbers.slice(i - preambleLength, i);
    let valid = false;
    for (let j = 0; j < window.length; j++) {
      for (let k = j + 1; k < window.length; k++) {
        if (getOrThrow(window[j]) + getOrThrow(window[k]) === getOrThrow(numbers[i])) {
          valid = true;
          break;
        }
      }
      if (valid) break;
    }
    if (!valid) return getOrThrow(numbers[i]);
  }
  throw new Error('No invalid number found');
}

export function findEncryptionWeakness(numbers: number[], invalidNumber: number): number {
  for (let i = 0; i < numbers.length; i++) {
    let sum = 0;
    for (let j = i; j < numbers.length; j++) {
      sum += getOrThrow(numbers[j]);
      if (sum === invalidNumber) {
        const range = numbers.slice(i, j + 1);
        return Math.min(...range) + Math.max(...range);
      }
      if (sum > invalidNumber) break;
    }
  }
  throw new Error('No contiguous set found');
}

export function part1(input: string[]): number {
  const preambleLength = 25;
  const numbers = parseNumbers(input);
  return findFirstInvalid(numbers, preambleLength);
}

export function part2(input: string[]): number {
  const preambleLength = 25;
  const numbers = parseNumbers(input);
  const invalidNumber = findFirstInvalid(numbers, preambleLength);
  return findEncryptionWeakness(numbers, invalidNumber);
}
