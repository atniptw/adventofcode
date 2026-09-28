import { part1, part2, findFirstInvalid, findEncryptionWeakness } from './day-09.js';

describe('Day 09', () => {
  test.each([
    {
      numbers: [
        35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576,
      ],
      preambleLength: 5,
      expected: 127,
    },
  ])(
    'findFirstInvalid($numbers, $preambleLength) -> $expected',
    ({ numbers, preambleLength, expected }) => {
      expect(findFirstInvalid(numbers, preambleLength)).toBe(expected);
    }
  );

  test.each([
    {
      // preamble is 1-25 (all valid pairs available); 100 has no two addends among them
      input: [...Array.from({ length: 25 }, (_, i) => String(i + 1)), '100'],
      expected: 100,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      numbers: [
        35, 20, 15, 25, 47, 40, 62, 55, 65, 95, 102, 117, 150, 182, 127, 219, 299, 277, 309, 576,
      ],
      target: 127,
      expected: 62,
    },
  ])('findEncryptionWeakness($numbers, $target) -> $expected', ({ numbers, target, expected }) => {
    expect(findEncryptionWeakness(numbers, target)).toBe(expected);
  });

  test.each([
    {
      // a shuffled 1-25 preamble (same "100 is invalid" reasoning as part1's fixture),
      // brute-force verified to have exactly one contiguous run summing to 100:
      // 22+2+11+23+5+18+19 = 100, so weakness = min(2) + max(23) = 25
      input: [
        '17',
        '3',
        '21',
        '4',
        '20',
        '8',
        '7',
        '1',
        '10',
        '16',
        '9',
        '22',
        '2',
        '11',
        '23',
        '5',
        '18',
        '19',
        '15',
        '13',
        '24',
        '12',
        '14',
        '25',
        '6',
        '100',
      ],
      expected: 25,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
