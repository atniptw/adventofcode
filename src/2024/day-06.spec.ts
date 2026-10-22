import { part1, part2 } from './day-06.js';

const example = [
  '....#.....',
  '.........#',
  '..........',
  '..#.......',
  '.......#..',
  '..........',
  '.#..^.....',
  '........#.',
  '#.........',
  '......#...',
];

describe('Day 06', () => {
  test.each([
    { input: example, expected: 41 },
    // the starting position counts as visited
    { input: ['^'], expected: 1 },
    // no obstacles: walks straight up and off the map
    { input: ['.', '.', '^'], expected: 3 },
    // blocked immediately: turns right without moving, then steps
    { input: ['#.', '^.'], expected: 2 },
    // blocked ahead and to the right: turns twice in place, then walks down
    { input: ['.#.', '.^#', '...'], expected: 2 },
    // the path crosses its own start square; it's only counted once
    { input: ['.#...', '....#', '.^...', '...#.'], expected: 7 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: example, expected: 6 },
    // nowhere to put an obstruction
    { input: ['^'], expected: 0 },
    // blocking her only sends her right and off the map
    { input: ['.', '^'], expected: 0 },
    // the part 1 crossing path: exactly one spot traps her
    { input: ['.#...', '....#', '.^...', '...#.'], expected: 1 },
    // she passes through squares again in a different direction without looping;
    // a check on position alone (ignoring direction) finds 2 false loops here
    { input: ['....', '#...', '...^', '...#'], expected: 0 },
    // an obstruction on her start square would trap her spinning in place, but it isn't allowed
    { input: ['##.', '^.#', '.#.'], expected: 0 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
