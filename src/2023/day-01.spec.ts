import { part1, part2 } from './day-01.js';

const longLine = `${'a'.repeat(100)}1${'b'.repeat(100)}2${'c'.repeat(100)}`;
const longWordLine = `${'x'.repeat(50)}one${'y'.repeat(50)}two${'z'.repeat(50)}`;

describe('Day 01', () => {
  describe('part1', () => {
    test.each([
      // 12 + 38 + 15 + 77
      { input: ['1abc2', 'pqr3stu8vwx', 'a1b2c3d4e5f', 'treb7uchet'], expected: 142 },
      // a single digit is both first and last
      { input: ['5'], expected: 55 },
      { input: ['a3b'], expected: 33 },
      // no digits
      { input: ['abcdef'], expected: 0 },
      { input: ['xyz'], expected: 0 },
      // empty input and empty lines; only the middle line counts
      { input: [], expected: 0 },
      { input: [''], expected: 0 },
      { input: ['', '1a2', ''], expected: 12 },
      // first and last of many digits
      { input: ['123456789'], expected: 19 },
      { input: ['987654321'], expected: 91 },
      // repeated digits
      { input: ['1111'], expected: 11 },
      { input: ['2222'], expected: 22 },
      // long lines
      { input: [longLine], expected: 12 },
      // many lines: 100 * 12
      { input: Array.from({ length: 100 }, () => '1a2'), expected: 1200 },
    ])('part1($input) -> $expected', ({ input, expected }) => {
      expect(part1(input)).toBe(expected);
    });
  });

  describe('part2', () => {
    test.each([
      // 29 + 83 + 13 + 24 + 42 + 14 + 76
      {
        input: [
          'two1nine',
          'eightwothree',
          'abcone2threexyz',
          'xtwone3four',
          '4nineeightseven2',
          'zoneight234',
          '7pqrstsixteen',
        ],
        expected: 281,
      },
      // lines from the example on their own
      { input: ['eightwothree'], expected: 83 },
      { input: ['xtwone3four'], expected: 24 },
      { input: ['zoneight234'], expected: 14 },
      // every digit word on its own
      { input: ['one'], expected: 11 },
      { input: ['two'], expected: 22 },
      { input: ['three'], expected: 33 },
      { input: ['four'], expected: 44 },
      { input: ['five'], expected: 55 },
      { input: ['six'], expected: 66 },
      { input: ['seven'], expected: 77 },
      { input: ['eight'], expected: 88 },
      { input: ['nine'], expected: 99 },
      // a single digit is both first and last
      { input: ['abc5def'], expected: 55 },
      // no digits
      { input: ['hello world'], expected: 0 },
      { input: ['no digits here'], expected: 0 },
      // empty input and empty lines
      { input: [], expected: 0 },
      { input: [''], expected: 0 },
      // first and last of many words
      { input: ['onetwothreefourfivesixseveneightnine'], expected: 19 },
      { input: ['nineightsevensixfivefourthreetwone'], expected: 91 },
      // overlapping words: both digits count
      { input: ['eightwo'], expected: 82 },
      { input: ['oneight'], expected: 18 },
      { input: ['twone'], expected: 21 },
      { input: ['eighthree'], expected: 83 },
      { input: ['sevenine'], expected: 79 },
      { input: ['onetwothreefourfive'], expected: 15 },
      { input: ['nineightsevenine'], expected: 99 },
      { input: ['threeightwo'], expected: 32 },
      { input: ['onetwoneighthreeightwo'], expected: 12 },
      // overlapping words next to digits
      { input: ['1eightwo'], expected: 12 },
      { input: ['eightwo3'], expected: 83 },
      { input: ['4oneight5'], expected: 45 },
      // digits and words mixed
      { input: ['1two3four5'], expected: 15 },
      { input: ['nine8seven'], expected: 97 },
      { input: ['one2three4five6seven8nine'], expected: 19 },
      { input: ['5onetwothree4'], expected: 54 },
      { input: ['1two3four5six7eight9'], expected: 19 },
      { input: ['onetwothreefourfive6'], expected: 16 },
      // words separated by other text
      { input: ['oneabctwodefthree'], expected: 13 },
      { input: ['fivexyzsevenmnoeight'], expected: 58 },
      { input: ['1abctwoxyzthree4'], expected: 14 },
      // a word anywhere in the line, including either end
      { input: ['aaone'], expected: 11 },
      { input: ['oneaa'], expected: 11 },
      { input: ['xtwox'], expected: 22 },
      { input: ['fiveight'], expected: 58 },
      { input: ['oneabc'], expected: 11 },
      { input: ['abcone'], expected: 11 },
      // repeated digits
      { input: ['oneoneone'], expected: 11 },
      { input: ['1one1one1'], expected: 11 },
      { input: ['1one'], expected: 11 },
      { input: ['one1'], expected: 11 },
      { input: ['two2two'], expected: 22 },
      { input: ['3three3'], expected: 33 },
      // only lowercase words count
      { input: ['one2three'], expected: 13 },
      { input: ['ONE2THREE'], expected: 22 },
      // lines are summed; a line with no digits contributes 0
      { input: ['one2three', 'four5six', 'seven8nine'], expected: 138 },
      { input: ['one2three', 'abcdef', 'four5six'], expected: 59 },
      // long lines
      { input: [longWordLine], expected: 12 },
    ])('part2($input) -> $expected', ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    });
  });
});
