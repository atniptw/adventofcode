import { part1, part2 } from './day-11.js';

describe('Day 11', () => {
  test.each([
    {
      input: [
        'aaa: you hhh',
        'you: bbb ccc',
        'bbb: ddd eee',
        'ccc: ddd eee fff',
        'ddd: ggg',
        'eee: out',
        'fff: out',
        'ggg: out',
        'hhh: ccc fff iii',
        'iii: out',
      ],
      expected: 5,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        'svr: aaa bbb',
        'aaa: fft',
        'fft: ccc',
        'bbb: tty',
        'tty: ccc',
        'ccc: ddd eee',
        'ddd: hub',
        'hub: fff',
        'eee: dac',
        'dac: fff',
        'fff: ggg hhh',
        'ggg: out',
        'hhh: out',
      ],
      expected: 2,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
