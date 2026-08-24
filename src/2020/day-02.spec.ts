import { part1, part2 } from './day-02.js';

describe('Day 02', () => {
  test.each([
    {
      input: ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'],
      expected: 2,
    },
    { input: ['2-4 x: xxy'], expected: 1 },
    { input: ['2-4 x: xxxxxy'], expected: 0 },
    { input: ['2-4 x: xy'], expected: 0 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc'],
      expected: 1,
    },
    { input: ['1-3 a: abcde'], expected: 1 },
    { input: ['2-9 c: ccccccccc'], expected: 0 },
    { input: ['1-3 b: cdefg'], expected: 0 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
