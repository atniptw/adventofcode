import { part1, part2 } from './day-03.js';

describe('Day 03', () => {
  test.each([
    {
      input: [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
        '..#.##.....',
        '.#.#.#....#',
        '.#........#',
        '#.##...#...',
        '#...##....#',
        '.#..#...#.#',
      ],
      expected: 7,
    },
    { input: ['....', '....', '....', '....'], expected: 0 },
    { input: ['####', '####', '####', '####'], expected: 3 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.todo.each([{ input: ['1'], expected: 0 }])(
    'part2($input) -> $expected',
    ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    }
  );
});
