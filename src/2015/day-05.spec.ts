import { part1, part2 } from './day-05.js';

describe('Day 05', () => {
  test.each([
    { input: ['ugknbfddgicrmopn'], expected: 1 },
    { input: ['aaa'], expected: 1 },
    { input: ['jchzalrnumimnmhp'], expected: 0 },
    { input: ['haegwjzuvuyypxyu'], expected: 0 },
    { input: ['dvszwmarrgswjxmb'], expected: 0 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['qjhvhtzxzqqjkmpb'], expected: 1 },
    { input: ['xxyxx'], expected: 1 },
    { input: ['aaa'], expected: 0 },
    { input: ['uurcxstgmygtbstg'], expected: 0 },
    { input: ['ieodomkazucvgmuy'], expected: 0 },
  ])(
    'part2($input) -> $expected',
    ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    }
  );
});
