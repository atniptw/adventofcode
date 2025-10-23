import {
  part1,
  part2,
  applyMapping,
  transformSeedToLocation,
  parseInput,
  parseSeedRanges,
  transformRange,
} from './day-05';
import type { Mapping, Range } from './day-05';

describe('Day 5: Seed Location Mapping', () => {
  test('maps number within range', () => {
    const mapping: Mapping = { destStart: 50, sourceStart: 98, length: 2 };
    expect(applyMapping(98, [mapping])).toBe(50);
    expect(applyMapping(99, [mapping])).toBe(51);
  });
});
