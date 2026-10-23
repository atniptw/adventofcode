import { part1, part2 } from './day-08.js';

const example = [
  '............',
  '........0...',
  '.....0......',
  '.......0....',
  '....0.......',
  '......A.....',
  '............',
  '............',
  '........A...',
  '.........A..',
  '............',
  '............',
];

// the three small `a` diagrams from the puzzle text
const twoAntennas = [
  '..........',
  '..........',
  '..........',
  '....a.....',
  '..........',
  '.....a....',
  '..........',
  '..........',
  '..........',
  '..........',
];
const threeAntennas = [
  '..........',
  '..........',
  '..........',
  '....a.....',
  '........a.',
  '.....a....',
  '..........',
  '..........',
  '..........',
  '..........',
];
const withCapitalA = [
  '..........',
  '..........',
  '..........',
  '....a.....',
  '........a.',
  '.....a....',
  '..........',
  '......A...',
  '..........',
  '..........',
];

describe('Day 08', () => {
  test.each([
    { input: example, expected: 14 },
    // one pair: one antinode on each side
    { input: twoAntennas, expected: 2 },
    // three pairs would make 6, but two land off the right edge
    { input: threeAntennas, expected: 4 },
    // the lone A makes nothing, but an a-antinode on top of it still counts
    { input: withCapitalA, expected: 4 },
    // a single antenna has no partner
    { input: ['...', '.a.', '...'], expected: 0 },
    { input: ['...', '...'], expected: 0 },
    // a and A are different frequencies, so they don't pair
    { input: ['a.A..'], expected: 0 },
    // one antinode is off the left edge (col -2), the other is in (col 4)
    { input: ['a.a..'], expected: 1 },
    // a-pair and b-pair both put an antinode at col 2: unique locations, counted once
    { input: ['aa.bb'], expected: 1 },
    // non-square maps: catches mixing up width and height in the bounds check
    { input: ['a..', '...', 'a..', '...', '...', '...'], expected: 1 },
    { input: ['a.a...', '......'], expected: 1 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: example, expected: 34 },
    // the three T antennas from the part 2 text
    {
      input: [
        'T.........',
        '...T......',
        '.T........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
      ],
      expected: 9,
    },
    // still needs a partner: a lone antenna isn't an antinode
    { input: ['...', '.a.', '...'], expected: 0 },
    { input: ['a.A..'], expected: 0 },
    // adjacent pair: the line runs the full row, antennas included
    { input: ['aa...'], expected: 5 },
    // both lines cover the whole row; each cell counted once
    { input: ['aa.bb'], expected: 5 },
    // diagonal line through a 3x3
    { input: ['a..', '.a.', '...'], expected: 3 },
    // non-square: the line runs the full height / width
    { input: ['a..', 'a..', '...', '...', '...', '...'], expected: 6 },
    { input: ['aa....', '......'], expected: 6 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
