import { part1, part2 } from './day-05.js';

describe('Day 05', () => {
  test.each([
    {
      input: ['3-5', '10-14', '16-20', '12-18', '', '1', '5', '8', '11', '17', '32'],
      expected: 3,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: ['3-5', '10-14', '16-20', '12-18', '', '1', '5', '8', '11', '17', '32'],
      expected: 14,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
