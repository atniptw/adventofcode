import { part1, part2 } from '../src/day-03';

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

    test('numbers at grid boundaries', () => {
      expect(part1(["123*"])).toBe(123);
      expect(part1(["*123"])).toBe(123);
      expect(part1(["123", "...*"])).toBe(123);
      expect(part1(["*...", "123"])).toBe(123);
    });

    test('diagonal adjacencies', () => {
      const input = [
        "*......",
        ".123...",
        ".......",
      ];
      expect(part1(input)).toBe(123);

      const input2 = [
        "......*",
        "...123.",
        ".......",
      ];
      expect(part1(input2)).toBe(123);

      const input3 = [
        ".......",
        "...123.",
        "......*",
      ];
      expect(part1(input3)).toBe(123);

      const input4 = [
        ".......",
        "...123.",
        "..*....",
      ];
      expect(part1(input4)).toBe(123);
    });

    test('multiple symbols around same number counts once', () => {
      const input = [
        "***",
        "123",
        "***",
      ];
      expect(part1(input)).toBe(123);
    });

    test('periods are not symbols', () => {
      const input = [
        "123.456",
        ".......",
        ".......",
      ];
      expect(part1(input)).toBe(0);
    });

    test('various symbol types', () => {
      expect(part1(["123#456"])).toBe(123 + 456);
      expect(part1(["123$456"])).toBe(123 + 456);
      expect(part1(["123+456"])).toBe(123 + 456);
      expect(part1(["123=456"])).toBe(123 + 456);
      expect(part1(["123@456"])).toBe(123 + 456);
      expect(part1(["123%456"])).toBe(123 + 456);
      expect(part1(["123&456"])).toBe(123 + 456);
      expect(part1(["123/456"])).toBe(123 + 456);
    });

    test('symbol between digits creates separate numbers', () => {
      expect(part1(["12*34"])).toBe(12 + 34);
    });

    test('numbers sharing the same symbol', () => {
      const input = [
        "123*456",
      ];
      expect(part1(input)).toBe(123 + 456);

      const input2 = [
        "123....",
        "...*...",
        "456.789",
      ];
      expect(part1(input2)).toBe(123 + 456 + 789);
    });

    test('symbol touches different parts of multi-digit number', () => {
      const input1 = [
        "..123..",
        "..*....",
      ];
      expect(part1(input1)).toBe(123);

      const input2 = [
        "..123..",
        ".*.....",
      ];
      expect(part1(input2)).toBe(123);

      const input3 = [
        "..123..",
        ".....*.",
      ];
      expect(part1(input3)).toBe(123);
    });

    test('empty and edge cases', () => {
      expect(part1([])).toBe(0);
      expect(part1([""])).toBe(0);
      expect(part1(["...", "...", "..."])).toBe(0);
      expect(part1(["***", "***", "***"])).toBe(0);
      expect(part1(["123"])).toBe(0);
    });

    test('single digit numbers', () => {
      expect(part1(["1*2*3*4"])).toBe(1 + 2 + 3 + 4);
    });

    test('numbers with zeros', () => {
      expect(part1(["0*0"])).toBe(0);
      expect(part1(["100*200"])).toBe(100 + 200);
      expect(part1(["305*"])).toBe(305);
    });

    test('duplicate numbers both adjacent', () => {
      const input = [
        "123.123",
        "...*...",
      ];
      expect(part1(input)).toBe(246);
    });

    test('duplicate numbers only one adjacent', () => {
      const input = [
        "123...123",
        "...*.....",
      ];
      expect(part1(input)).toBe(123);
    });

    test('complex grid with multiple patterns', () => {
      const input = [
        "12.34",
        ".*.#.",
        "56.78",
      ];
      expect(part1(input)).toBe(12 + 34 + 56 + 78);
    });
  });

  describe('Part 2 - Gears', () => {
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
      expect(part2(input)).toBe(467835);
    });

    test('gear with exactly 2 numbers horizontally', () => {
      expect(part2(["123*456"])).toBe(123 * 456);
    });

    test('gear with exactly 2 numbers vertically', () => {
      const input = [
        "123",
        ".*.",
        "456",
      ];
      expect(part2(input)).toBe(123 * 456);
    });

    test('gear with exactly 2 numbers diagonally', () => {
      const input = [
        "123...",
        "...*...",
        "...456",
      ];
      expect(part2(input)).toBe(123 * 456);
    });

    test('star with only 1 number is not a gear', () => {
      const input = [
        "123",
        ".*.",
        "...",
      ];
      expect(part2(input)).toBe(0);
    });

    test('star with 3+ numbers is not a gear', () => {
      const input = [
        "12.34",
        "..*.",
        "56...",
      ];
      expect(part2(input)).toBe(0);
    });

    test('star with 0 numbers is not a gear', () => {
      const input = [
        "....",
        "..*.",
        "....",
      ];
      expect(part2(input)).toBe(0);
    });

    test('multiple gears in grid', () => {
      const input = [
        "123*456",
        ".......",
        "789*012",
      ];
      expect(part2(input)).toBe(123 * 456 + 789 * 12);
    });

    test('same number value appearing twice counts as 2 numbers', () => {
      const input = [
        "123...",
        "..*..",
        "...123",
      ];
      expect(part2(input)).toBe(123 * 123);
    });

    test('other symbols are not gears', () => {
      expect(part2(["123#456"])).toBe(0);
      expect(part2(["123+456"])).toBe(0);
      expect(part2(["123$456"])).toBe(0);
    });

    test('gear with single digit numbers', () => {
      expect(part2(["1*2"])).toBe(1 * 2);
    });

    test('complex gear patterns', () => {
      const input = [
        "2.3",
        ".*.",
        "4..",
      ];
      expect(part2(input)).toBe(0);

      const input2 = [
        "2...",
        ".*..",
        "..3.",
      ];
      expect(part2(input2)).toBe(2 * 3);
    });

    test('gears at grid boundaries', () => {
      expect(part2(["*12", "34."])).toBe(12 * 34);
      expect(part2([".12", "34*"])).toBe(12 * 34);
    });

    test('zero in gear calculation', () => {
      expect(part2(["0*5"])).toBe(0);
      expect(part2(["10*20"])).toBe(10 * 20);
    });
  });
});