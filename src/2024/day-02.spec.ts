import { part1, part2 } from './day-02.js';

const example = ['7 6 4 2 1', '1 2 7 8 9', '9 7 6 2 1', '1 3 2 4 5', '8 6 4 4 1', '1 3 6 7 9'];

describe('Day 02', () => {
  describe('part1', () => {
    test.each([
      { input: example, expected: 2 },
      // each example report on its own
      { input: ['7 6 4 2 1'], expected: 1 },
      { input: ['1 2 7 8 9'], expected: 0 },
      { input: ['9 7 6 2 1'], expected: 0 },
      { input: ['1 3 2 4 5'], expected: 0 },
      { input: ['8 6 4 4 1'], expected: 0 },
      { input: ['1 3 6 7 9'], expected: 1 },
      // a step of exactly 3 is allowed, in either direction
      { input: ['1 4 7 10'], expected: 1 },
      { input: ['10 7 4 1'], expected: 1 },
      // a step of 4 at the very start is not
      { input: ['1 5 6 7'], expected: 0 },
      // a step of 0 at the very start is not
      { input: ['1 1 2 3'], expected: 0 },
    ])('part1($input) -> $expected', ({ input, expected }) => {
      expect(part1(input)).toBe(expected);
    });
  });

  describe('part2', () => {
    test.each([
      { input: example, expected: 4 },
      // each example report on its own
      { input: ['7 6 4 2 1'], expected: 1 },
      { input: ['1 2 7 8 9'], expected: 0 },
      { input: ['9 7 6 2 1'], expected: 0 },
      { input: ['1 3 2 4 5'], expected: 1 },
      { input: ['8 6 4 4 1'], expected: 1 },
      { input: ['1 3 6 7 9'], expected: 1 },
      // removing the first level fixes it
      { input: ['9 1 2 3 4'], expected: 1 },
      // first pair points the wrong direction; removing the first level fixes it
      { input: ['5 6 4 3 2'], expected: 1 },
      { input: ['3 2 4 5 6'], expected: 1 },
      // removing the last level fixes it
      { input: ['1 2 3 4 10'], expected: 1 },
      { input: ['1 2 3 4 4'], expected: 1 },
      // a spike in the middle
      { input: ['1 2 9 3 4'], expected: 1 },
      // two bad levels: one removal isn't enough
      { input: ['1 5 9 10'], expected: 0 },
      { input: ['1 1 1 2'], expected: 0 },
    ])('part2($input) -> $expected', ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    });
  });
});
