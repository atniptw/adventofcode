import { part1, part2 } from './day-01.js';

describe('Day 01', () => {
  test.each([
    { input: ['R50'], expected: 1 },
    { input: ['L68', 'L30', 'R48', 'L5', 'R60', 'L55'], expected: 2 },
    { input: ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82'], expected: 3 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: ['R50'], expected: 1 }, // Basic right move hitting 0
    { input: ['L50'], expected: 1 }, // Basic left move hitting 0
    { input: ['L68', 'L30', 'R48'], expected: 2 }, // Multiple moves with wraps
    { input: ['L49', 'L1'], expected: 1 }, // Wraps through 0 once: 50+49=99, 99+1=0
    { input: ['L25', 'L25', 'L25', 'L25'], expected: 1 }, // Wraps through 0 at 100: 50+25=75, 100->0, 25, 50
    { input: ['L99', 'L1', 'L50', 'R1', 'L1'], expected: 3 }, // Tests both L and R wrapping: passes 0 three times
    { input: ['L100', 'R100'], expected: 2 }, // Large moves in opposite directions
    { input: ['L200'], expected: 2 }, // Move larger than dial size: 50+200=250%100=50, wraps twice
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
