import { applyMapping, part1, part2 } from './day-05.js';
import type { Mapping } from './day-05.js';

const example = [
  'seeds: 79 14 55 13',
  '',
  'seed-to-soil map:',
  '50 98 2',
  '52 50 48',
  '',
  'soil-to-fertilizer map:',
  '0 15 37',
  '37 52 2',
  '39 0 15',
  '',
  'fertilizer-to-water map:',
  '49 53 8',
  '0 11 42',
  '42 0 7',
  '57 7 4',
  '',
  'water-to-light map:',
  '88 18 7',
  '18 25 70',
  '',
  'light-to-temperature map:',
  '45 77 23',
  '81 45 19',
  '68 64 13',
  '',
  'temperature-to-humidity map:',
  '0 69 1',
  '1 0 69',
  '',
  'humidity-to-location map:',
  '60 56 37',
  '56 93 4',
];

const seedToSoil: Mapping[] = [{ destStart: 50, sourceStart: 98, length: 2 }];

describe('Day 05', () => {
  describe('applyMapping', () => {
    test.each([
      // a value inside the source range is shifted by the same offset
      { value: 98, mappings: seedToSoil, expected: 50 },
      { value: 99, mappings: seedToSoil, expected: 51 },
    ])('applyMapping($value, $mappings) -> $expected', ({ value, mappings, expected }) => {
      expect(applyMapping(value, mappings)).toBe(expected);
    });
  });

  describe('part1', () => {
    test.each([{ input: example, expected: 35 }])(
      'part1($input) -> $expected',
      ({ input, expected }) => {
        expect(part1(input)).toBe(expected);
      }
    );
  });

  describe('part2', () => {
    test.each([{ input: example, expected: 46 }])(
      'part2($input) -> $expected',
      ({ input, expected }) => {
        expect(part2(input)).toBe(expected);
      }
    );
  });
});
