import { part1, part2 } from './day-06.js';

describe('Day 06', () => {
  test.each([
    {
      input: ['123 328  51 64 ', '45 64  387 23 ', '6 98  215 314', '*   +   *   +  '],
      expected: 4277556,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: ['123 328  51 64 ', ' 45 64  387 23 ', '  6 98  215 314', '*   +   *   +  '],
      expected: 3263827,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
