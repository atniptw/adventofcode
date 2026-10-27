import { part1, part2 } from './day-04.js';

const example = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX',
];

describe('Day 04', () => {
  describe('part1', () => {
    test.each([
      { input: example, expected: 18 },
      // the small illustration from the prompt
      { input: ['..X...', '.SAMX.', '.A..A.', 'XMAS.S', '.X....'], expected: 4 },
      // each of the 8 directions on its own
      { input: ['XMAS'], expected: 1 },
      { input: ['SAMX'], expected: 1 },
      { input: ['X', 'M', 'A', 'S'], expected: 1 },
      { input: ['S', 'A', 'M', 'X'], expected: 1 },
      { input: ['X...', '.M..', '..A.', '...S'], expected: 1 },
      { input: ['S...', '.A..', '..M.', '...X'], expected: 1 },
      { input: ['...X', '..M.', '.A..', 'S...'], expected: 1 },
      { input: ['...S', '..A.', '.M..', 'X...'], expected: 1 },
      // overlapping matches share letters and each count
      { input: ['XMASAMX'], expected: 2 },
      // a partial word running off the edge of the grid doesn't count
      { input: ['XMA'], expected: 0 },
      { input: [''], expected: 0 },
    ])('part1($input) -> $expected', ({ input, expected }) => {
      expect(part1(input)).toBe(expected);
    });
  });

  describe('part2', () => {
    test.each([
      { input: example, expected: 9 },
      // each of the 4 ways two MASes can cross (forwards/backwards on each diagonal)
      { input: ['M.S', '.A.', 'M.S'], expected: 1 },
      { input: ['S.M', '.A.', 'S.M'], expected: 1 },
      { input: ['M.M', '.A.', 'S.S'], expected: 1 },
      { input: ['S.S', '.A.', 'M.M'], expected: 1 },
      // both MASes must be valid: here one diagonal reads MAM / SAS
      { input: ['M.S', '.A.', 'S.M'], expected: 0 },
      // only one diagonal is a MAS
      { input: ['M.X', '.A.', 'X.S'], expected: 0 },
      // a + shape (horizontal and vertical) is not an X
      { input: ['.M.', 'MAS', '.S.'], expected: 0 },
      // neighbouring X-MASes can share corner letters
      { input: ['M.M.M', '.A.A.', 'S.S.S'], expected: 2 },
      // an A on the edge of the grid can't be the centre of an X
      { input: ['MAS'], expected: 0 },
      { input: ['XMAS'], expected: 0 },
      { input: [''], expected: 0 },
    ])('part2($input) -> $expected', ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    });
  });
});
