import {
  checksum,
  compact,
  compactFiles,
  expandDiskMap,
  findFile,
  findGap,
  moveFile,
  part1,
  part2,
} from './day-09.js';

const example = ['2333133121414131402'];

// '0..111' -> [0, null, null, 1, 1, 1]; only for single-digit IDs, like the puzzle's diagrams
const fromDiagram = (diagram: string): (number | null)[] =>
  [...diagram].map((ch) => (ch === '.' ? null : Number(ch)));

const exampleDisk = fromDiagram('00...111...2...333.44.5555.6666.777.888899');

// '11111111111111111111111': 12 one-block files, IDs 10 and 11 are two digits
// prettier-ignore
const twelveFiles = [0, null, 1, null, 2, null, 3, null, 4, null, 5, null, 6, null, 7, null, 8, null, 9, null, 10, null, 11];
// prettier-ignore
const twelveFilesCompacted = [0, 11, 1, 10, 2, 9, 3, 8, 4, 7, 5, 6, null, null, null, null, null, null, null, null, null, null, null];

describe('Day 09', () => {
  describe('expandDiskMap', () => {
    test.each([
      { map: '12345', expected: fromDiagram('0..111....22222') },
      {
        map: '2333133121414131402',
        expected: exampleDisk,
      },
      { map: '1', expected: [0] },
      // no free space between files
      { map: '90909', expected: fromDiagram('000000000111111111222222222') },
      // zero-length gaps still advance to the next file ID
      { map: '10203', expected: [0, 1, 1, 2, 2, 2] },
      // even length: ends on free space
      { map: '12', expected: [0, null, null] },
      // IDs 10 and 11 are single blocks holding two-digit numbers
      { map: '11111111111111111111111', expected: twelveFiles },
    ])('expandDiskMap($map)', ({ map, expected }) => {
      expect(expandDiskMap(map)).toEqual(expected);
    });
  });

  describe('compact', () => {
    test.each([
      // the last frame of each step-by-step diagram in the puzzle
      { blocks: fromDiagram('0..111....22222'), expected: fromDiagram('022111222......') },
      {
        blocks: exampleDisk,
        expected: fromDiagram('0099811188827773336446555566..............'),
      },
      // already compact: nothing moves
      {
        blocks: fromDiagram('000000000111111111222222222'),
        expected: fromDiagram('000000000111111111222222222'),
      },
      // trailing free space only: nothing after it to pull in
      { blocks: fromDiagram('0..'), expected: fromDiagram('0..') },
      { blocks: fromDiagram('0..111'), expected: fromDiagram('0111..') },
      // two-digit IDs move as single blocks, last block first
      { blocks: twelveFiles, expected: twelveFilesCompacted },
    ])('compact($blocks)', ({ blocks, expected }) => {
      expect(compact(blocks)).toEqual(expected);
    });

    test("doesn't modify its input", () => {
      const blocks = fromDiagram('0..111');
      compact(blocks);
      expect(blocks).toEqual(fromDiagram('0..111'));
    });
  });

  describe('checksum', () => {
    test.each([
      { blocks: fromDiagram('0099811188827773336446555566..............'), expected: 1928 },
      { blocks: fromDiagram('022111222......'), expected: 60 },
      // free blocks are skipped wherever they are, not just at the end
      { blocks: fromDiagram('0..111....22222'), expected: 132 },
      // position counts free blocks: the 1 is at position 2
      { blocks: fromDiagram('..1'), expected: 2 },
      { blocks: [0, null, 10, 11], expected: 53 },
      { blocks: [], expected: 0 },
    ])('checksum($blocks) -> $expected', ({ blocks, expected }) => {
      expect(checksum(blocks)).toBe(expected);
    });
  });

  describe('part1', () => {
    test.each([
      { input: example, expected: 1928 },
      // 0..111....22222 -> 022111222
      { input: ['12345'], expected: 60 },
      // one file, nothing to move; ID 0 contributes 0 at every position
      { input: ['1'], expected: 0 },
      // no free space between files: nothing moves
      { input: ['90909'], expected: 513 },
      // map ends on free space (even length): nothing after it to pull in
      { input: ['12'], expected: 0 },
      { input: ['19'], expected: 0 },
      // 0..111 -> 0111..
      { input: ['123'], expected: 6 },
      // 12 one-block files: IDs 10 and 11 are two digits, so one char per block won't hold them
      { input: ['11111111111111111111111'], expected: 381 },
      // 13 files with zero-length gaps: already compact, IDs 0..12
      { input: ['1010101010101010101010101'], expected: 650 },
    ])('part1($input) -> $expected', ({ input, expected }) => {
      expect(part1(input)).toBe(expected);
    });
  });

  describe('findFile', () => {
    test.each([
      { disk: fromDiagram('00...111'), id: 0, expected: { start: 0, length: 2 } },
      { disk: fromDiagram('00...111'), id: 1, expected: { start: 5, length: 3 } },
      { disk: exampleDisk, id: 9, expected: { start: 40, length: 2 } },
      { disk: exampleDisk, id: 2, expected: { start: 11, length: 1 } },
      // the length stops where a different file starts, not only at free space
      { disk: fromDiagram('0011122'), id: 1, expected: { start: 2, length: 3 } },
      // file runs to the end of the array
      { disk: fromDiagram('0..11'), id: 1, expected: { start: 3, length: 2 } },
      // two-digit IDs: 10 isn't confused with 1 or 0
      { disk: [0, null, 10, 10, null, 11], id: 10, expected: { start: 2, length: 2 } },
      { disk: [0, null, 10, 10, null, 11], id: 11, expected: { start: 5, length: 1 } },
    ])('findFile($disk, $id) -> $expected', ({ disk, id, expected }) => {
      expect(findFile(disk, id)).toEqual(expected);
    });
  });

  describe('findGap', () => {
    test.each([
      { disk: fromDiagram('0..111'), length: 2, before: 3, expected: 1 },
      // a gap that's too small
      { disk: fromDiagram('0..111'), length: 3, before: 3, expected: undefined },
      // leftmost gap that fits: skips the 1-wide gap for a 2-block file...
      { disk: fromDiagram('0.1..22'), length: 2, before: 5, expected: 3 },
      // ...but takes it for a 1-block file
      { disk: fromDiagram('0.1..22'), length: 1, before: 5, expected: 1 },
      // two 1-wide gaps aren't one 2-wide gap
      { disk: fromDiagram('0.1.22'), length: 2, before: 4, expected: undefined },
      // nothing left of `before`, even though there's room after it
      { disk: fromDiagram('0.11..'), length: 2, before: 2, expected: undefined },
      // a gap ending right where `before` starts still counts
      { disk: fromDiagram('0..11'), length: 2, before: 3, expected: 1 },
      // the gap has to fit entirely left of `before`: only 2 of these 5 free blocks count
      { disk: fromDiagram('0.....'), length: 3, before: 3, expected: undefined },
      // a gap at the very start of the disk
      { disk: fromDiagram('...0'), length: 3, before: 3, expected: 0 },
      { disk: exampleDisk, length: 2, before: 40, expected: 2 },
      // the example's biggest gap is 3 wide
      { disk: exampleDisk, length: 4, before: 40, expected: undefined },
      { disk: fromDiagram('000'), length: 1, before: 3, expected: undefined },
    ])('findGap($disk, $length, $before) -> $expected', ({ disk, length, before, expected }) => {
      expect(findGap(disk, length, before)).toBe(expected);
    });
  });

  describe('moveFile', () => {
    // moves in place: callers pass the array they're compacting
    test.each([
      // the first two moves in the part 2 diagram (99, then 777)
      {
        disk: exampleDisk,
        from: 40,
        to: 2,
        length: 2,
        expected: fromDiagram('0099.111...2...333.44.5555.6666.777.8888..'),
      },
      {
        disk: fromDiagram('0099.111...2...333.44.5555.6666.777.8888..'),
        from: 32,
        to: 8,
        length: 3,
        expected: fromDiagram('0099.1117772...333.44.5555.6666.....8888..'),
      },
      // the gap ends right where the file starts
      { disk: fromDiagram('0..11'), from: 3, to: 1, length: 2, expected: fromDiagram('011..') },
      { disk: fromDiagram('0.1'), from: 2, to: 1, length: 1, expected: fromDiagram('01.') },
      // only the moved file changes: 11 stays put
      {
        disk: fromDiagram('0..1122'),
        from: 5,
        to: 1,
        length: 2,
        expected: fromDiagram('02211..'),
      },
      // two-digit IDs
      {
        disk: [0, null, null, 10, 10],
        from: 3,
        to: 1,
        length: 2,
        expected: [0, 10, 10, null, null],
      },
    ])(
      'moveFile($disk, from $from, to $to, length $length)',
      ({ disk, from, to, length, expected }) => {
        const copy = [...disk];
        moveFile(copy, from, to, length);
        expect(copy).toEqual(expected);
      }
    );
  });

  describe('compactFiles', () => {
    test.each([
      // the last frame of the part 2 diagram
      {
        blocks: exampleDisk,
        expected: fromDiagram('00992111777.44.333....5555.6666.....8888..'),
      },
      // neither file fits in a gap to its left (2 needs 5, 1 needs 3): nothing moves
      { blocks: fromDiagram('0..111....22222'), expected: fromDiagram('0..111....22222') },
      // files only move left: the big gap after 1 doesn't count
      { blocks: fromDiagram('0.11..'), expected: fromDiagram('0.11..') },
      // exact fit
      { blocks: fromDiagram('0..11'), expected: fromDiagram('011..') },
      // leftmost span that fits, not the first span: 22 skips the 1-wide gap
      { blocks: fromDiagram('0.1..22'), expected: fromDiagram('01.22..') },
      // 22 jumps past file 1 into the leftmost gap big enough
      { blocks: fromDiagram('0...111.22'), expected: fromDiagram('022.111...') },
      // free blocks must be contiguous: two 1-wide gaps can't hold 22, and once 1
      // moves, the merged gap comes too late; each file is tried exactly once
      { blocks: fromDiagram('0.1.22'), expected: fromDiagram('01..22') },
      { blocks: fromDiagram('000'), expected: fromDiagram('000') },
      // two-digit IDs, highest first
      { blocks: twelveFiles, expected: twelveFilesCompacted },
    ])('compactFiles($blocks)', ({ blocks, expected }) => {
      expect(compactFiles(blocks)).toEqual(expected);
    });

    test("doesn't modify its input", () => {
      const blocks = fromDiagram('0..11');
      compactFiles(blocks);
      expect(blocks).toEqual(fromDiagram('0..11'));
    });
  });

  describe('part2', () => {
    test.each([
      { input: example, expected: 2858 },
      // nothing fits, so this is the uncompacted checksum
      { input: ['12345'], expected: 132 },
      // 0..111: part 1 splits the file up (6); part 2 can't move it (12)
      { input: ['123'], expected: 12 },
      { input: ['1'], expected: 0 },
      { input: ['90909'], expected: 513 },
      { input: ['11111111111111111111111'], expected: 381 },
    ])('part2($input) -> $expected', ({ input, expected }) => {
      expect(part2(input)).toBe(expected);
    });
  });
});
