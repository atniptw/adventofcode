import { part1, part2 } from './day-10.js';

describe('Day 10', () => {
  test.each([
    {
      input: ['16', '10', '15', '5', '1', '11', '7', '19', '6', '12', '4'],
      expected: 35, // 7 differences of 1 jolt * 5 differences of 3 jolts
    },
    {
      input: [
        '28',
        '33',
        '18',
        '42',
        '31',
        '14',
        '46',
        '20',
        '48',
        '47',
        '24',
        '23',
        '49',
        '45',
        '19',
        '38',
        '39',
        '11',
        '1',
        '32',
        '25',
        '35',
        '8',
        '17',
        '7',
        '9',
        '4',
        '2',
        '34',
        '10',
        '3',
      ],
      expected: 220, // 22 differences of 1 jolt * 10 differences of 3 jolts
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: ['16', '10', '15', '5', '1', '11', '7', '19', '6', '12', '4'],
      expected: 8,
    },
    {
      input: [
        '28',
        '33',
        '18',
        '42',
        '31',
        '14',
        '46',
        '20',
        '48',
        '47',
        '24',
        '23',
        '49',
        '45',
        '19',
        '38',
        '39',
        '11',
        '1',
        '32',
        '25',
        '35',
        '8',
        '17',
        '7',
        '9',
        '4',
        '2',
        '34',
        '10',
        '3',
      ],
      expected: 19208,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
