import { part1, part2 } from './day-01.js';

describe('Day 01', () => {
  test.each([
    { input: ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'], expected: 11 },
    { input: ['1   2', '3   4'], expected: 2 },
    { input: ['1   3'], expected: 2 },
    { input: ['2   3'], expected: 1 },
    { input: ['3   3'], expected: 0 },
    { input: ['3   4'], expected: 1 },
    { input: ['3   5'], expected: 2 },
    { input: ['4   9'], expected: 5 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'], expected: 31 },
    { input: ['3   3', '0   3', '0   3'], expected: 9 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
