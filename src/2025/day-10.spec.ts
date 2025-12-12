import { part1, part2, calculateMovesForLights, calculateMovesForJoltages } from './day-10.js';

describe('Day 10', () => {
  test.each([
    {
      input: '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}',

      expected: 2,
    },
    {
      input: '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}',

      expected: 3,
    },
    {
      input: '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}',
      expected: 2,
    },
  ])('calculateMoves($input) -> $expected', ({ input, expected }) => {
    expect(calculateMovesForLights(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}',
        '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}',
        '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}',
      ],
      expected: 7,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.todo.each([
    {
      input: '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}',

      expected: 10,
    },
    {
      input: '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}',

      expected: 12,
    },
    {
      input: '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}',
      expected: 11,
    },
  ])('calculateMovesWithJoltages($input) -> $expected', ({ input, expected }) => {
    expect(calculateMovesForJoltages(input)).toBe(expected);
  });

  test.todo.each([
    {
      input: [
        '[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}',
        '[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}',
        '[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}',
      ],
      expected: 33,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
