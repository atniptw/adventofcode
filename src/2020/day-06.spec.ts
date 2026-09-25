import { part1, part2 } from './day-06.js';

describe('Day 06', () => {
  test.each([
    { input: ['abcx', 'abcy', 'abcz'], expected: 6 },
    { input: ['abc'], expected: 3 },
    { input: ['a', 'a', 'a', 'a'], expected: 1 },
    {
      input: ['abc', '', 'a', 'b', 'c', '', 'ab', 'ac', '', 'a', 'a', 'a', 'a', '', 'b'],
      expected: 11,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['abc'], expected: 3 },
    { input: ['a', 'b', 'c'], expected: 0 },
    { input: ['ab', 'ac'], expected: 1 },
    { input: ['a', 'a', 'a', 'a'], expected: 1 },
    { input: ['b'], expected: 1 },
    {
      input: ['abc', '', 'a', 'b', 'c', '', 'ab', 'ac', '', 'a', 'a', 'a', 'a', '', 'b'],
      expected: 6,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
