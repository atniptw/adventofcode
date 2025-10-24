import { part1, part2 } from './day-01.js';

describe('Day 01: Trebuchet?!', () => {
  describe('Basic Examples', () => {
    test('part1 examples from AoC', () => {
      const input = [
        '1abc2', // → 12
        'pqr3stu8vwx', // → 38
        'a1b2c3d4e5f', // → 15
        'treb7uchet', // → 77
      ];
      expect(part1(input)).toBe(142); // 12+38+15+77
    });

    test('part2 examples from AoC', () => {
      const input = [
        'two1nine', // → 29
        'eightwothree', // → 83
        'abcone2threexyz', // → 13
        'xtwone3four', // → 24
        '4nineeightseven2', // → 42
        'zoneight234', // → 14
        '7pqrstsixteen', // → 76
      ];
      expect(part2(input)).toBe(281); // 29+83+13+24+42+14+76
    });
  });

  describe('Edge Cases', () => {
    test('single digits', () => {
      expect(part1(['5'])).toBe(55);
      expect(part2(['seven'])).toBe(77);
      expect(part1(['a3b'])).toBe(33);
      expect(part2(['abc5def'])).toBe(55);
    });

    test('no digits', () => {
      expect(part1(['abcdef'])).toBe(0);
      expect(part2(['hello world'])).toBe(0);
      expect(part1(['xyz'])).toBe(0);
      expect(part2(['no digits here'])).toBe(0);
    });

    test('empty input', () => {
      expect(part1([])).toBe(0);
      expect(part2([])).toBe(0);
    });

    test('empty lines', () => {
      expect(part1([''])).toBe(0);
      expect(part2([''])).toBe(0);
      expect(part1(['', '1a2', ''])).toBe(12); // Only middle line counts
    });

    test('multiple digits same line', () => {
      expect(part1(['123456789'])).toBe(19); // first=1, last=9
      expect(part1(['987654321'])).toBe(91); // first=9, last=1
      expect(part2(['onetwothreefourfivesixseveneightnine'])).toBe(19); // one...nine
    });
  });

  describe('Critical Overlapping Cases', () => {
    test('overlapping word patterns', () => {
      // These test how the implementation handles overlapping word digits
      expect(part2(['eightwo'])).toBe(82); // Should find both "eight" and "two"
      expect(part2(['oneight'])).toBe(18); // Should find both "one" and "eight"
      expect(part2(['twone'])).toBe(21); // Should find both "two" and "one"
      expect(part2(['eighthree'])).toBe(83); // Should find "eight" and "three"
      expect(part2(['sevenine'])).toBe(79); // Should find "seven" and "nine"
    });

    test('complex overlapping scenarios', () => {
      expect(part2(['onetwothreefourfive'])).toBe(15); // one...five
      expect(part2(['nineightsevenine'])).toBe(99); // nine...nine
      expect(part2(['threeightwo'])).toBe(32); // three...two
    });

    test('overlapping with numbers', () => {
      expect(part2(['1eightwo'])).toBe(12); // 1...two
      expect(part2(['eightwo3'])).toBe(83); // eight...3
      expect(part2(['4oneight5'])).toBe(45); // 4...5
    });
  });

  describe('Mixed Content', () => {
    test('numbers and words mixed', () => {
      expect(part2(['1two3four5'])).toBe(15);
      expect(part2(['nine8seven'])).toBe(97);
      expect(part2(['one2three4five6seven8nine'])).toBe(19);
      expect(part2(['5onetwothree4'])).toBe(54);
    });

    test('words separated by text', () => {
      expect(part2(['oneabctwodefthree'])).toBe(13);
      expect(part2(['fivexyzsevenmnoeight'])).toBe(58);
      expect(part2(['1abctwoxyzthree4'])).toBe(14);
    });

    test('partial word matches', () => {
      expect(part2(['aaone'])).toBe(11); // "one" not at start
      expect(part2(['oneaa'])).toBe(11); // "one" with suffix
      expect(part2(['xtwox'])).toBe(22); // "two" in middle
      expect(part2(['fiveight'])).toBe(58); // "five" and "eight"
    });
  });

  describe('Boundary Value Tests', () => {
    test('all word digits', () => {
      expect(part2(['onetwothreefourfivesixseveneightnine'])).toBe(19);
      expect(part2(['nineightsevensixfivefourthreetwone'])).toBe(91);
    });

    test('repeated digits', () => {
      expect(part1(['1111'])).toBe(11);
      expect(part2(['oneoneone'])).toBe(11);
      expect(part2(['1one1one1'])).toBe(11);
      expect(part1(['2222'])).toBe(22);
    });

    test('word digits with numbers', () => {
      expect(part2(['1one'])).toBe(11);
      expect(part2(['one1'])).toBe(11);
      expect(part2(['two2two'])).toBe(22);
      expect(part2(['3three3'])).toBe(33);
    });

    test('alternating patterns', () => {
      expect(part2(['1two3four5six7eight9'])).toBe(19);
      expect(part2(['onetwothreefourfive6'])).toBe(16);
    });
  });

  describe('Potential Bug Scenarios', () => {
    test('word digits at line boundaries', () => {
      expect(part2(['oneabc'])).toBe(11);
      expect(part2(['abcone'])).toBe(11);
      expect(part2(['one'])).toBe(11);
      expect(part2(['two'])).toBe(22);
    });

    test('case sensitivity handling', () => {
      // Current implementation should only handle lowercase
      expect(part2(['one2three'])).toBe(13);
      expect(part2(['ONE2THREE'])).toBe(22); // Should only find the number
    });

    test('multiple lines processing', () => {
      const input = [
        'one2three', // 13
        'four5six', // 46
        'seven8nine', // 79
      ];
      expect(part2(input)).toBe(138); // 13+46+79
    });

    test('lines with no valid digits', () => {
      const input = [
        'one2three', // 13
        'abcdef', // 0
        'four5six', // 46
      ];
      expect(part2(input)).toBe(59); // 13+0+46
    });
  });

  describe('Performance and Stress Tests', () => {
    test('long lines', () => {
      const longLine = `${'a'.repeat(100)}1${'b'.repeat(100)}2${'c'.repeat(100)}`;
      expect(part1([longLine])).toBe(12);

      const longWordLine = `${'x'.repeat(50)}one${'y'.repeat(50)}two${'z'.repeat(50)}`;
      expect(part2([longWordLine])).toBe(12);
    });

    test('many simple lines', () => {
      const manyLines = Array(100).fill('1a2');
      expect(part1(manyLines)).toBe(1200); // 100 * 12
    });

    test('complex overlapping patterns', () => {
      // Test that handles multiple overlaps correctly
      expect(part2(['onetwoneighthreeightwo'])).toBe(12); // Should be one...two
    });
  });

  describe('Regression Tests', () => {
    test('common edge cases from real inputs', () => {
      expect(part2(['eightwothree'])).toBe(83);
      expect(part2(['eightwo'])).toBe(82);
      expect(part2(['xtwone3four'])).toBe(24);
      expect(part2(['zoneight234'])).toBe(14);
    });

    test('digit word completeness', () => {
      expect(part2(['one'])).toBe(11);
      expect(part2(['two'])).toBe(22);
      expect(part2(['three'])).toBe(33);
      expect(part2(['four'])).toBe(44);
      expect(part2(['five'])).toBe(55);
      expect(part2(['six'])).toBe(66);
      expect(part2(['seven'])).toBe(77);
      expect(part2(['eight'])).toBe(88);
      expect(part2(['nine'])).toBe(99);
    });
  });
});
