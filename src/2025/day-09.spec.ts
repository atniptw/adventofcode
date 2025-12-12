import { part1, part2 } from './day-09.js';

describe('Day 09', () => {
  test.each([
    {
      input: ['7,1', '11,1', '11,7', '9,7', '9,5', '2,5', '2,3', '7,3'],
      expected: 50,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.skip.each([
    {
      input: ['7,1', '11,1', '11,7', '9,7', '9,5', '2,5', '2,3', '7,3'],
      expected: 24,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
