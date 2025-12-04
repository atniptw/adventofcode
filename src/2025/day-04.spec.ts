import { part1, part2, translate } from './day-04.js';

describe('Day 01', () => {
  test.each([
    {
      input: [
        '..@@.@@@@.',
        '@@@.@.@.@@',
        '@@@@@.@.@@',
        '@.@@@@..@.',
        '@@.@@@@.@@',
        '.@@@@@@@.@',
        '.@.@.@.@@@',
        '@.@@@.@@@@',
        '.@@@@@@@@.',
        '@.@.@@@.@.',
      ],
      expected: [
        '..xx.xx@x.',
        'x@@.@.@.@@',
        '@@@@@.x.@@',
        '@.@@@@..@.',
        'x@.@@@@.@x',
        '.@@@@@@@.@',
        '.@.@.@.@@@',
        'x.@@@.@@@@',
        '.@@@@@@@@.',
        'x.x.@@@.x.',
      ],
    },
  ])('translate($input) -> $expected', ({ input, expected }) => {
    expect(translate(input)).toEqual(expected);
  });

  test.each([
    {
      input: [
        '..@@.@@@@.',
        '@@@.@.@.@@',
        '@@@@@.@.@@',
        '@.@@@@..@.',
        '@@.@@@@.@@',
        '.@@@@@@@.@',
        '.@.@.@.@@@',
        '@.@@@.@@@@',
        '.@@@@@@@@.',
        '@.@.@@@.@.',
      ],
      expected: 13,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        '..@@.@@@@.',
        '@@@.@.@.@@',
        '@@@@@.@.@@',
        '@.@@@@..@.',
        '@@.@@@@.@@',
        '.@@@@@@@.@',
        '.@.@.@.@@@',
        '@.@@@.@@@@',
        '.@@@@@@@@.',
        '@.@.@@@.@.',
      ],
      expected: 43,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
