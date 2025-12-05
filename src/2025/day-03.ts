export function largestNumber(num: string, size: number): number {
  if (size <= 0 || size > num.length) {
    return -1;
  }

  let result = '';
  let remaining = size;
  let startIdx = 0;

  // Greedy approach: always pick the largest digit in the valid window
  while (remaining > 0) {
    // Find the largest digit in the valid window
    let maxDigit = -1;
    let maxPos = -1;

    // We need 'remaining' digits, so we must leave enough digits after our choice
    const endIdx = num.length - remaining + 1;

    for (let i = startIdx; i < endIdx; i++) {
      const digit = parseInt(num.charAt(i), 10);
      if (digit > maxDigit) {
        maxDigit = digit;
        maxPos = i;
      }
    }

    result += maxDigit;
    startIdx = maxPos + 1;
    remaining--;
  }

  return parseInt(result, 10);
}

export function part1(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    sum += largestNumber(line, 2);
  });

  return sum;
}

export function part2(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    sum += largestNumber(line, 12);
  });

  return sum;
}
