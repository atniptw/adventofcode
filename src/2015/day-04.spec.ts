import { part1, part2 } from './day-04.js';

describe('Day 04', () => {
  test.each([
    { input: ['abcdef'], expected: 609043 },
    { input: ['pqrstuv'], expected: 1048970 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.todo.each([{ input: ['1'], expected: 0 }])(
    'part2($input) -> $expected',
    ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    }
  );
});
