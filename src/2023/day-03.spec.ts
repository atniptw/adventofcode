import { part1, part2 } from './day-03';

describe('Day 03 - Gear Ratios', () => {
  describe('Part 1 - Part Numbers', () => {
    test('example from puzzle', () => {
      const input = [
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598.."
      ];
      expect(part1(input)).toBe(4361);
    });
  });
});
