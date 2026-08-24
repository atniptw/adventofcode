import { parseNumbers } from '../utils/index.js';

const TARGET = 2020;

export function part1(input: string[]): number {
  const numbers = parseNumbers(input);
  const seen = new Set<number>();

  for (const num of numbers) {
    const complement = TARGET - num;
    if (seen.has(complement)) {
      return num * complement;
    }
    seen.add(num);
  }

  throw new Error('No two numbers sum to 2020');
}

export function part2(input: string[]): number {
  const numbers = [...parseNumbers(input)].sort((a, b) => a - b);

  for (let i = 0; i < numbers.length - 2; i++) {
    const first = numbers[i];
    if (first === undefined) {
      continue;
    }

    let low = i + 1;
    let high = numbers.length - 1;

    while (low < high) {
      const second = numbers[low];
      const third = numbers[high];
      if (second === undefined || third === undefined) {
        break;
      }

      const sum = first + second + third;
      if (sum === TARGET) {
        return first * second * third;
      } else if (sum < TARGET) {
        low++;
      } else {
        high--;
      }
    }
  }

  throw new Error('No three numbers sum to 2020');
}
