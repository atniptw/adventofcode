import { part1, part2 } from '../../src/2023/day-02';

describe('Day 02', () => {
  describe('Basic Functionality', () => {
    test('example from problem statement', () => {
      const input = [
        "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
        "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
        "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"
      ];
      expect(part1(input)).toBe(8);
      expect(part2(input)).toBe(2286);
    });
  });

  describe('Edge Cases - Boundary Values', () => {
    test('exact limit values for part1', () => {
      const input = ["Game 1: 12 red, 13 green, 14 blue"];
      expect(part1(input)).toBe(1); // Should be possible
    });

    test('one over each limit for part1', () => {
      const inputs = [
        ["Game 1: 13 red, 13 green, 14 blue"], // red over
        ["Game 1: 12 red, 14 green, 14 blue"], // green over  
        ["Game 1: 12 red, 13 green, 15 blue"]  // blue over
      ];
      inputs.forEach(input => {
        expect(part1(input)).toBe(0); // Should be impossible
      });
    });

    test('single color at limits', () => {
      const testCases = [
        { input: ["Game 1: 12 red"], part1Expected: 1 },
        { input: ["Game 2: 15 red"], part1Expected: 0 }, // over limit
        { input: ["Game 3: 13 green"], part1Expected: 3 },
        { input: ["Game 4: 14 blue"], part1Expected: 4 }
      ];
      
      testCases.forEach(({ input, part1Expected }) => {
        expect(part1(input)).toBe(part1Expected);
      });
    });
  });

  describe('Edge Cases - Mathematical', () => {
    test('zero values in part2 power calculation', () => {
      const testCases = [
        { input: ["Game 1: 5 red, 3 green"], expected: 0 }, // missing blue = 0, power = 0
        { input: ["Game 2: 5 red"], expected: 0 }, // missing green & blue = 0, power = 0
        { input: ["Game 3: 3 green, 4 blue"], expected: 0 } // missing red = 0, power = 0
      ];
      
      testCases.forEach(({ input, expected }) => {
        expect(part2(input)).toBe(expected);
      });
    });

    test('minimum required across multiple sets', () => {
      const input = ["Game 1: 1 red, 2 green; 3 red, 1 blue; 2 green, 4 blue"];
      // Min required: 3 red, 2 green, 4 blue → Power = 3 * 2 * 4 = 24
      expect(part2(input)).toBe(24);
    });

    test('single set games', () => {
      const input = ["Game 1: 5 red, 3 green, 2 blue"];
      expect(part1(input)).toBe(1); // Should be possible
      expect(part2(input)).toBe(30); // 5 * 3 * 2 = 30
    });
  });

  describe('Edge Cases - Input Format', () => {
    test('extra whitespace handling', () => {
      const inputs = [
        "Game  1:  3  blue,  4  red;  1  red,  2  green",
        "Game 1 : 3 blue , 4 red ; 1 red , 2 green"
      ];
      // Both should parse without throwing errors
      inputs.forEach(input => {
        expect(() => part1([input])).not.toThrow();
        expect(() => part2([input])).not.toThrow();
      });
    });

    test('different color orders', () => {
      const input1 = ["Game 1: 3 blue, 4 red, 2 green"];
      const input2 = ["Game 1: 4 red, 2 green, 3 blue"];
      const input3 = ["Game 1: 2 green, 3 blue, 4 red"];
      
      // All should have same results regardless of color order
      expect(part1(input1)).toBe(part1(input2));
      expect(part1(input2)).toBe(part1(input3));
      expect(part2(input1)).toBe(part2(input2));
      expect(part2(input2)).toBe(part2(input3));
    });
  });

  describe('Edge Cases - Empty Input Handling', () => {
    test('empty input array', () => {
      expect(part1([])).toBe(0);
      expect(part2([])).toBe(0);
    });

    test('input with empty lines', () => {
      const input = [
        "Game 1: 3 blue, 4 red",
        "",
        "Game 2: 1 red, 2 green",
        "   ",
        "Game 3: 5 blue"
      ];
      expect(() => part1(input)).not.toThrow();
      expect(() => part2(input)).not.toThrow();
      // Should only count the 3 valid games
      expect(part1(input)).toBe(6); // 1 + 2 + 3 = 6 (all possible)
    });
  });

  describe('Stress Testing', () => {
    test('large numbers', () => {
      const input = ["Game 1: 999999 red, 999999 green, 999999 blue"];
      expect(part1(input)).toBe(0); // Over limits
      expect(part2(input)).toBe(999999 * 999999 * 999999); // Very large power
    });

    test('many sets in single game', () => {
      const sets = Array.from({length: 10}, (_, i) => `${i+1} red, ${i+1} green, ${i+1} blue`);
      const input = [`Game 1: ${sets.join('; ')}`];
      expect(part1(input)).toBe(1); // 10 red is within 12 red limit, so possible
      expect(part2(input)).toBe(10 * 10 * 10); // Max of each should be 10
    });

    test('game that exceeds limits', () => {
      const input = ["Game 1: 15 red, 15 green, 15 blue"];
      expect(part1(input)).toBe(0); // All colors exceed limits
      expect(part2(input)).toBe(15 * 15 * 15); // Power = 3375
    });

    test('high game IDs', () => {
      const input = [
        "Game 999: 1 red, 1 green, 1 blue",
        "Game 1000: 2 red, 2 green, 2 blue"
      ];
      expect(part1(input)).toBe(1999); // 999 + 1000 = 1999 (both possible)
    });
  });
});