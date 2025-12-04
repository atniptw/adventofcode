import { part1, part2, largestNumber } from './day-03.js';

describe('Day 03', () => {
  test.each([
    { input: '987654321111111', expected: 98 },
    { input: '811111111111119', expected: 89 },
    { input: '234234234234278', expected: 78 },
    { input: '818181911112111', expected: 92 },
    {
      input:
        '4374393634627266376474276644376666365551634337854472353256224441642396253632315522324245257365668356',
      expected: 99,
    },
  ])('largestNumber($input) -> $expected', ({ input, expected }) => {
    expect(largestNumber(input, 2)).toBe(expected);
  });

  test.each([
    {
      input: ['987654321111111', '811111111111119', '234234234234278', '818181911112111'],
      expected: 357,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: '987654321111111', expected: 987654321111 },
    { input: '811111111111119', expected: 811111111119 },
    { input: '234234234234278', expected: 434234234278 },
    { input: '818181911112111', expected: 888911112111 },
  ])('largestNumber($input) -> $expected', ({ input, expected }) => {
    expect(largestNumber(input, 12)).toBe(expected);
  });

  test.each([
    {
      input: ['987654321111111', '811111111111119', '234234234234278', '818181911112111'],
      expected: 3121910778619,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
