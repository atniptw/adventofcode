import { part1, part2 } from './day-03.js';

const example = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.58.',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
];

describe('Day 03', () => {
  describe('part1', () => {
    test.each([{ input: example, expected: 4361 }])(
      'part1($input) -> $expected',
      ({ input, expected }) => {
        expect(part1(input)).toBe(expected);
      }
    );
  });

  describe('part2', () => {
    test.each([{ input: example, expected: 467835 }])(
      'part2($input) -> $expected',
      ({ input, expected }) => {
        expect(part2(input)).toBe(expected);
      }
    );
  });
});
