import { part1, part2 } from './day-05.js';

describe('Day 05', () => {
  test.each([
    { input: ['FBFBBFFRLR'], expected: 357 },
    { input: ['BFFFBBFRRR'], expected: 567 },
    { input: ['FFFBBBFRRR'], expected: 119 },
    { input: ['BBFFBBFRLL'], expected: 820 },
    {
      input: ['FBFBBFFRLR', 'BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'],
      expected: 820,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        'FFFFBFBLLL',
        'FFFFBFBLLR',
        'FFFFBFBLRL',
        'FFFFBFBLRR',
        'FFFFBFBRLL',
        'FFFFBFBRRL',
        'FFFFBFBRRR',
        'FFFFBBFLLL',
        'FFFFBBFLLR',
        'FFFFBBFLRL',
      ],
      expected: 45,
    },
    {
      input: [
        'FFBBFFBLLL',
        'FFBBFFBLLR',
        'FFBBFFBLRL',
        'FFBBFFBLRR',
        'FFBBFFBRLL',
        'FFBBFFBRLR',
        'FFBBFFBRRR',
        'FFBBFBFLLL',
        'FFBBFBFLLR',
        'FFBBFBFLRL',
      ],
      expected: 206,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
