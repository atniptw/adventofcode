import { part1, part2, hasExactHalfMatch, hasRepeatedPattern } from './day-02.js';

describe('Day 02', () => {
  test.each([
    { input: '11', expected: true },
    { input: '22', expected: true },
    { input: '99', expected: true },
    { input: '1010', expected: true },
    { input: '1188511885', expected: true },
    { input: '222222', expected: true },
    { input: '1698522', expected: false },
    { input: '446446', expected: true },
    { input: '38593859', expected: true },
  ])('hasExactHalfMatch($input) -> $expected', ({ input, expected }) => {
    expect(hasExactHalfMatch(input)).toBe(expected);
  });

  test.each([
    { input: '11', expected: true },
    { input: '22', expected: true },
    { input: '99', expected: true },
    { input: '111', expected: true },
    { input: '999', expected: true },
    { input: '1010', expected: true },
    { input: '1188511885', expected: true },
    { input: '222222', expected: true },
    { input: '1698522', expected: false },
    { input: '446446', expected: true },
    { input: '38593859', expected: true },
    { input: '565656', expected: true },
    { input: '824824824', expected: true },
    { input: '2121212121', expected: true },
    { input: '12341234', expected: true },
    { input: '123123123', expected: true },
    { input: '1212121212', expected: true },
    { input: '1111111', expected: true },
    { input: '1234', expected: false },
  ])('hasRepeatedPattern($input) -> $expected', ({ input, expected }) => {
    expect(hasRepeatedPattern(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
      ],
      expected: 1227775554,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
      ],
      expected: 4174379265,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
