import { part1, part2 } from './day-03.js';

describe('Day 03', () => {
  test.each([
    { input: ['>'], expected: 2 },
    { input: ['^>v<'], expected: 4 },
    { input: ['^v^v^v^v^v'], expected: 2 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['^v'], expected: 3 },
    { input: ['^>v<'], expected: 3 },
    { input: ['^v^v^v^v^v'], expected: 11 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
