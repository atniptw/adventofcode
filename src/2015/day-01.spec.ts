import { part1, part2 } from './day-01.js';

describe('Day 01', () => {
  test.each([
    { input: ['(())'], expected: 0 },
    { input: ['()()'], expected: 0 },
    { input: ['((('], expected: 3 },
    { input: ['(()(()('], expected: 3 },
    { input: ['))((((('], expected: 3 },
    { input: ['())'], expected: -1 },
    { input: ['))('], expected: -1 },
    { input: [')))'], expected: -3 },
    { input: [')())())'], expected: -3 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: [')'], expected: 1 },
    { input: ['()())'], expected: 5 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
