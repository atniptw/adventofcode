import { applyMapping } from './day-05.js';
import type { Mapping } from './day-05.js';

describe('Day 5: Seed Location Mapping', () => {
  test('maps number within range', () => {
    const mapping: Mapping = { destStart: 50, sourceStart: 98, length: 2 };
    expect(applyMapping(98, [mapping])).toBe(50);
    expect(applyMapping(99, [mapping])).toBe(51);
  });
});
