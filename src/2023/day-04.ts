function parseNumbers(numbersStr: string): Set<number> {
  return new Set(
    numbersStr
      .trim()
      .split(/\s+/)
      .filter((s) => s.length > 0)
      .map((n) => parseInt(n))
  );
}

function countMatches(line: string): number {
  const [_cardPart, numbersPart = ''] = line.split(':');
  const [winningStr = '', yourStr = ''] = numbersPart.split('|');

  const winningNumbers = parseNumbers(winningStr);
  const yourNumbers = parseNumbers(yourStr);

  let matches = 0;
  for (const num of yourNumbers) {
    if (winningNumbers.has(num)) {
      matches++;
    }
  }

  return matches;
}

export function part1(input: string[]): number {
  let totalPoints = 0;

  for (const line of input) {
    const matches = countMatches(line);

    if (matches > 0) {
      const points = Math.pow(2, matches - 1);
      totalPoints += points;
    }
  }

  return totalPoints;
}

export function part2(input: string[]): number {
  if (input.length === 0) return 0;

  const matchCounts: number[] = input.map(countMatches);
  const cardCounts = new Array(input.length).fill(1);

  for (let i = 0; i < input.length; i++) {
    const matches = matchCounts[i] ?? 0;
    const currentCardCount = cardCounts[i];

    for (let j = 1; j <= matches && i + j < input.length; j++) {
      cardCounts[i + j] += currentCardCount;
    }
  }

  return cardCounts.reduce((sum, count) => sum + count, 0);
}
