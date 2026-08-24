import { part1, part2 } from './day-01.js';

describe('Day 01', () => {
  test.each([
    { input: ['1721', '979', '366', '299', '675', '1456'], expected: 514579 },
    { input: ['1000', '1020'], expected: 1020000 },
    { input: ['500', '600', '700', '1420', '600'], expected: 852000 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['1721', '979', '366', '299', '675', '1456'], expected: 241861950 },
    { input: ['1000', '1000', '20'], expected: 20000000 },
    { input: ['500', '600', '700', '720', '600'], expected: 302400000 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
