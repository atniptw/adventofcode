function sum(numbers: number[]): number {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

export function part1(input: string[]): number {
  const calibrationValues = input.map((line) => {
    const digits = line.match(/\d/g);
    if (!digits || digits.length === 0) {
      return 0;
    }

    const first = digits[0];
    const last = digits[digits.length - 1];
    return parseInt(first + last, 10);
  });

  return sum(calibrationValues);
}

export function part2(input: string[]): number {
  const digitWords = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };

  const calibrationValues = input.map((line) => {
    const digits: string[] = [];

    // Find all digits (numeric and word) in order of appearance
    for (let i = 0; i < line.length; i++) {
      // Use charAt to get a string instead of possibly undefined via indexing
      const ch = line.charAt(i);

      // Check for numeric digit
      if (/\d/.test(ch)) {
        digits.push(ch);
      } else {
        // Check for word digits starting at this position
        for (const [word, digit] of Object.entries(digitWords)) {
          if (line.substring(i, i + word.length) === word) {
            digits.push(digit);
            break; // Only match the first word at this position
          }
        }
      }
    }

    if (digits.length === 0) {
      return 0;
    }

    const first = digits[0] ?? '0';
    const last = digits[digits.length - 1] ?? '0';
    return parseInt(first + last, 10);
  });

  return sum(calibrationValues);
}
