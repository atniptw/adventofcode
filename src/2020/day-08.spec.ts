import { part1, part2 } from './day-08.js';

describe('Day 08', () => {
  test.each([
    {
      input: [
        'nop +0',
        'acc +1',
        'jmp +4',
        'acc +3',
        'jmp -3',
        'acc -99',
        'acc +1',
        'jmp -4',
        'acc +6',
      ],
      expected: 5,
    },
    {
      // jumps straight back to itself; acc never runs
      input: ['jmp +0'],
      expected: 0,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        'nop +0',
        'acc +1',
        'jmp +4',
        'acc +3',
        'jmp -3',
        'acc -99',
        'acc +1',
        'jmp -4',
        'acc +6',
      ],
      expected: 8,
    },
    {
      // flipping the jmp to nop lets it fall off the end after one acc
      input: ['acc +1', 'jmp -1'],
      expected: 1,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
