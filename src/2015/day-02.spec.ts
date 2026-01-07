import { part1, part2 } from './day-02.js';

describe('Day 02', () => {
  test.each([
    { input: ['2x3x4'], expected: 58 },
    { input: ['1x1x10'], expected: 43 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['2x3x4'], expected: 34 },
    { input: ['1x1x10'], expected: 14 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
