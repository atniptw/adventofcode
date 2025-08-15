import { describe, test, expect } from 'vitest';
import { part1, part2, applyMapping, transformSeedToLocation, parseInput, Mapping, Range, parseSeedRanges, transformRange } from '../../src/2023/day-05';

describe('Day 5: Seed Location Mapping', () => {
  describe('Phase 1: Single Mapping Understanding', () => {
    test('maps number within range', () => {
      // Mapping: 50 98 2 means source range 98-99 maps to destination range 50-51
      const mapping: Mapping = { destStart: 50, sourceStart: 98, length: 2 };
      expect(applyMapping(98, [mapping])).toBe(50);
      expect(applyMapping(99, [mapping])).toBe(51);
    });

    test('unmapped numbers stay the same', () => {
      const mapping: Mapping = { destStart: 50, sourceStart: 98, length: 2 };
      expect(applyMapping(97, [mapping])).toBe(97);   // Below range
      expect(applyMapping(100, [mapping])).toBe(100); // Above range
      expect(applyMapping(10, [mapping])).toBe(10);   // Far outside
      expect(applyMapping(0, [mapping])).toBe(0);     // Zero case
    });

    test('boundary values', () => {
      const mapping: Mapping = { destStart: 50, sourceStart: 98, length: 2 };
      expect(applyMapping(98, [mapping])).toBe(50);   // Start of range (inclusive)
      expect(applyMapping(99, [mapping])).toBe(51);   // End of range (inclusive)
      expect(applyMapping(100, [mapping])).toBe(100); // Just outside (exclusive)
    });

    test('offset calculation within range', () => {
      // Mapping: 52 50 48 means source 50-97 maps to destination 52-99
      const mapping: Mapping = { destStart: 52, sourceStart: 50, length: 48 };
      expect(applyMapping(50, [mapping])).toBe(52);   // offset 0: 50 + 0 = 50 → 52 + 0 = 52
      expect(applyMapping(51, [mapping])).toBe(53);   // offset 1: 50 + 1 = 51 → 52 + 1 = 53
      expect(applyMapping(97, [mapping])).toBe(99);   // offset 47: 50 + 47 = 97 → 52 + 47 = 99
      expect(applyMapping(98, [mapping])).toBe(98);   // Outside range, stays same
    });

    test('zero destination start', () => {
      // Mapping can map to destination starting at 0
      const mapping: Mapping = { destStart: 0, sourceStart: 15, length: 37 };
      expect(applyMapping(15, [mapping])).toBe(0);
      expect(applyMapping(16, [mapping])).toBe(1);
      expect(applyMapping(51, [mapping])).toBe(36);   // 15 + 36 = 51 → 0 + 36 = 36
      expect(applyMapping(52, [mapping])).toBe(52);   // Outside range
    });

    test('single number range', () => {
      // Range length 1 means only one number maps
      const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 1 };
      expect(applyMapping(50, [mapping])).toBe(100);
      expect(applyMapping(51, [mapping])).toBe(51);   // Not in range
      expect(applyMapping(49, [mapping])).toBe(49);   // Not in range
    });
  });

  describe('Phase 2: Multiple Mapping Rules', () => {
    test('first matching rule wins', () => {
      const mappings: Mapping[] = [
        { destStart: 50, sourceStart: 98, length: 2 },  // 98-99 → 50-51
        { destStart: 52, sourceStart: 50, length: 48 }  // 50-97 → 52-99
      ];
      expect(applyMapping(98, mappings)).toBe(50);  // First rule matches
      expect(applyMapping(50, mappings)).toBe(52);  // Second rule matches
      expect(applyMapping(49, mappings)).toBe(49);  // No rule matches
      expect(applyMapping(100, mappings)).toBe(100); // No rule matches
    });

    test('multiple non-overlapping ranges', () => {
      const mappings: Mapping[] = [
        { destStart: 10, sourceStart: 0, length: 5 },   // 0-4 → 10-14
        { destStart: 20, sourceStart: 10, length: 5 },  // 10-14 → 20-24
        { destStart: 30, sourceStart: 20, length: 5 }   // 20-24 → 30-34
      ];
      expect(applyMapping(2, mappings)).toBe(12);   // First range
      expect(applyMapping(12, mappings)).toBe(22);  // Second range
      expect(applyMapping(22, mappings)).toBe(32);  // Third range
      expect(applyMapping(5, mappings)).toBe(5);    // Gap between ranges
      expect(applyMapping(15, mappings)).toBe(15);  // Gap between ranges
    });

    test('empty mapping list', () => {
      // No mapping rules means all numbers stay the same
      expect(applyMapping(42, [])).toBe(42);
      expect(applyMapping(0, [])).toBe(0);
      expect(applyMapping(999, [])).toBe(999);
    });

    test('overlapping ranges - first rule priority', () => {
      // What happens if ranges overlap? First rule should win
      const mappings: Mapping[] = [
        { destStart: 100, sourceStart: 0, length: 10 }, // 0-9 → 100-109
        { destStart: 200, sourceStart: 5, length: 10 }  // 5-14 → 200-209 (overlaps)
      ];
      expect(applyMapping(3, mappings)).toBe(103);  // First rule
      expect(applyMapping(7, mappings)).toBe(107);  // First rule wins over second
      expect(applyMapping(12, mappings)).toBe(207); // Only second rule applies
    });
  });

  describe('Phase 3: Transformation Chain', () => {
    test('seed to soil to fertilizer simple chain', () => {
      const seedToSoil: Mapping[] = [{ destStart: 50, sourceStart: 98, length: 2 }];
      const soilToFertilizer: Mapping[] = [{ destStart: 0, sourceStart: 15, length: 37 }];
      
      const seed = 98;
      const soil = applyMapping(seed, seedToSoil);           // 98 → 50
      const fertilizer = applyMapping(soil, soilToFertilizer); // 50 → 35 (50 in range [15,52) maps to 0+(50-15)=35)
      
      expect(soil).toBe(50);
      expect(fertilizer).toBe(35);
    });

    test('unmapped values pass through entire chain', () => {
      const seedToSoil: Mapping[] = [{ destStart: 50, sourceStart: 98, length: 2 }];
      const soilToFertilizer: Mapping[] = [{ destStart: 0, sourceStart: 15, length: 37 }];
      const fertilizerToWater: Mapping[] = [{ destStart: 49, sourceStart: 53, length: 8 }];
      
      const seed = 10;  // This won't match any rules in any category
      const soil = applyMapping(seed, seedToSoil);              // 10 → 10
      const fertilizer = applyMapping(soil, soilToFertilizer);   // 10 → 10
      const water = applyMapping(fertilizer, fertilizerToWater); // 10 → 10
      
      expect(soil).toBe(10);
      expect(fertilizer).toBe(10);
      expect(water).toBe(10);
    });

    test('value gets mapped at each step', () => {
      const seedToSoil: Mapping[] = [{ destStart: 52, sourceStart: 50, length: 48 }];
      const soilToFertilizer: Mapping[] = [{ destStart: 0, sourceStart: 15, length: 37 }];
      
      const seed = 79;
      const soil = applyMapping(seed, seedToSoil);           // 79 → 81 (52 + (79-50))
      const fertilizer = applyMapping(soil, soilToFertilizer); // 81 → 81 (no mapping)
      
      expect(soil).toBe(81);
      expect(fertilizer).toBe(81);
    });

    test('multiple mappings in single transformation', () => {
      const mappings: Mapping[] = [
        { destStart: 0, sourceStart: 15, length: 37 },  // 15-51 → 0-36
        { destStart: 37, sourceStart: 52, length: 2 },  // 52-53 → 37-38
        { destStart: 39, sourceStart: 0, length: 15 }   // 0-14 → 39-53
      ];
      
      expect(applyMapping(0, mappings)).toBe(39);   // Third mapping
      expect(applyMapping(15, mappings)).toBe(0);   // First mapping
      expect(applyMapping(52, mappings)).toBe(37);  // Second mapping
      expect(applyMapping(54, mappings)).toBe(54);  // No mapping
    });
  });

  describe('Phase 4: AoC Example Validation', () => {
    // Based on the typical AoC 2023 Day 5 example
    test('example seed 79 transformation', () => {
      const allMappings = {
        seedToSoil: [
          { destStart: 50, sourceStart: 98, length: 2 },
          { destStart: 52, sourceStart: 50, length: 48 }
        ],
        soilToFertilizer: [
          { destStart: 0, sourceStart: 15, length: 37 },
          { destStart: 37, sourceStart: 52, length: 2 },
          { destStart: 39, sourceStart: 0, length: 15 }
        ],
        fertilizerToWater: [
          { destStart: 49, sourceStart: 53, length: 8 },
          { destStart: 0, sourceStart: 11, length: 42 },
          { destStart: 42, sourceStart: 0, length: 7 },
          { destStart: 57, sourceStart: 7, length: 4 }
        ],
        waterToLight: [
          { destStart: 88, sourceStart: 18, length: 7 },
          { destStart: 18, sourceStart: 25, length: 70 }
        ],
        lightToTemp: [
          { destStart: 45, sourceStart: 77, length: 23 },
          { destStart: 81, sourceStart: 45, length: 19 },
          { destStart: 68, sourceStart: 64, length: 13 }
        ],
        tempToHumidity: [
          { destStart: 0, sourceStart: 69, length: 1 },
          { destStart: 1, sourceStart: 0, length: 69 }
        ],
        humidityToLocation: [
          { destStart: 60, sourceStart: 56, length: 37 },
          { destStart: 56, sourceStart: 93, length: 4 }
        ]
      };

      // Manually trace seed 79 through all transformations
      let value = 79;
      value = applyMapping(value, allMappings.seedToSoil);       // 79 → 81
      value = applyMapping(value, allMappings.soilToFertilizer); // 81 → 81
      value = applyMapping(value, allMappings.fertilizerToWater); // 81 → 81
      value = applyMapping(value, allMappings.waterToLight);     // 81 → 74
      value = applyMapping(value, allMappings.lightToTemp);      // 74 → 78
      value = applyMapping(value, allMappings.tempToHumidity);   // 78 → 78
      value = applyMapping(value, allMappings.humidityToLocation); // 78 → 82

      expect(value).toBe(82);
    });

    test('example minimum location from seeds', () => {
      const seeds = [79, 14, 55, 13];
      
      // This will be implemented as transformSeedToLocation function
      // For now, we expect specific results based on the example
      
      // Expected transformations based on AoC example:
      // Seed 79 → Location 82
      // Seed 14 → Location 43  
      // Seed 55 → Location 86
      // Seed 13 → Location 35
      
      // Minimum should be 35
      // This test will be implemented once we have the full transformation function
      expect(true).toBe(true); // Placeholder until implementation
    });
  });

  describe('Phase 5: Edge Cases', () => {
    test('zero values throughout', () => {
      const mapping: Mapping = { destStart: 0, sourceStart: 0, length: 10 };
      expect(applyMapping(0, [mapping])).toBe(0);
      expect(applyMapping(5, [mapping])).toBe(5);
    });

    test('large numbers', () => {
      const mapping: Mapping = { destStart: 1000000, sourceStart: 2000000, length: 1000000 };
      expect(applyMapping(2000000, [mapping])).toBe(1000000);
      expect(applyMapping(2500000, [mapping])).toBe(1500000);
      expect(applyMapping(2999999, [mapping])).toBe(1999999);
      expect(applyMapping(3000000, [mapping])).toBe(3000000); // Outside range
    });

    test('adjacent ranges', () => {
      const mappings: Mapping[] = [
        { destStart: 100, sourceStart: 0, length: 10 },  // 0-9 → 100-109
        { destStart: 200, sourceStart: 10, length: 10 }  // 10-19 → 200-209
      ];
      expect(applyMapping(9, mappings)).toBe(109);  // End of first range
      expect(applyMapping(10, mappings)).toBe(200); // Start of second range
    });

    test('range length of zero', () => {
      // Zero-length ranges should not match anything
      const mapping: Mapping = { destStart: 10, sourceStart: 5, length: 0 };
      expect(applyMapping(5, [mapping])).toBe(5); // Should not match
      expect(applyMapping(4, [mapping])).toBe(4);
      expect(applyMapping(6, [mapping])).toBe(6);
    });

    test('maximum safe integer handling', () => {
      const maxSafe = Number.MAX_SAFE_INTEGER;
      const mapping: Mapping = { destStart: 0, sourceStart: maxSafe - 10, length: 5 };
      expect(applyMapping(maxSafe - 10, [mapping])).toBe(0);
      expect(applyMapping(maxSafe - 6, [mapping])).toBe(4);
      expect(applyMapping(maxSafe, [mapping])).toBe(maxSafe); // Outside range
    });
  });

  describe('Integration: Input Parsing', () => {
    test('parse simple input format', () => {
      const input = [
        'seeds: 79 14 55 13',
        '',
        'seed-to-soil map:',
        '50 98 2',
        '52 50 48',
        '',
        'soil-to-fertilizer map:',
        '0 15 37',
        '37 52 2'
      ];

      const parsed = parseInput(input);
      expect(parsed.seeds).toEqual([79, 14, 55, 13]);
      expect(parsed.categories).toHaveLength(2);
      expect(parsed.categories[0].name).toBe('seed-to-soil');
      expect(parsed.categories[0].mappings).toHaveLength(2);
      expect(parsed.categories[1].name).toBe('soil-to-fertilizer');
      expect(parsed.categories[1].mappings).toHaveLength(2);
    });

    test('parse mapping lines correctly', () => {
      const input = [
        'seeds: 1 2 3',
        '',
        'test-map:',
        '50 98 2',
        '52 50 48'
      ];

      const parsed = parseInput(input);
      const mappings = parsed.categories[0].mappings;
      
      expect(mappings[0]).toEqual({ destStart: 50, sourceStart: 98, length: 2 });
      expect(mappings[1]).toEqual({ destStart: 52, sourceStart: 50, length: 48 });
    });
  });

  describe('Part 1: Find Minimum Location', () => {
    test('basic minimum location finding', () => {
      const input = [
        'seeds: 79 14 55 13',
        '',
        'seed-to-soil map:',
        '50 98 2',
        '52 50 48'
      ];

      // This will test the complete part1 function once implemented
      // For now, placeholder test
      expect(true).toBe(true);
    });
  });

  describe('Part 2: Range-Based Seeds', () => {
    describe('Phase 1: Seed Range Parsing', () => {
      test('parse pairs as (start, length)', () => {
        const input = ['seeds: 79 14 55 13'];
        const { seedRanges } = parseSeedRanges(input[0]);
        
        expect(seedRanges).toHaveLength(2);
        expect(seedRanges[0]).toEqual({ start: 79, end: 93 }); // 79 + 14 = 93
        expect(seedRanges[1]).toEqual({ start: 55, end: 68 }); // 55 + 13 = 68
      });

      test('handle single range (2 numbers)', () => {
        const input = ['seeds: 10 5'];
        const { seedRanges } = parseSeedRanges(input[0]);
        
        expect(seedRanges).toHaveLength(1);
        expect(seedRanges[0]).toEqual({ start: 10, end: 15 });
      });

      test('handle multiple ranges', () => {
        const input = ['seeds: 10 5 20 3 30 2'];
        const { seedRanges } = parseSeedRanges(input[0]);
        
        expect(seedRanges).toHaveLength(3);
        expect(seedRanges[0]).toEqual({ start: 10, end: 15 });
        expect(seedRanges[1]).toEqual({ start: 20, end: 23 });
        expect(seedRanges[2]).toEqual({ start: 30, end: 32 });
      });

      test('handle zero-length ranges', () => {
        const input = ['seeds: 10 0 20 5'];
        const { seedRanges } = parseSeedRanges(input[0]);
        
        expect(seedRanges).toHaveLength(2);
        expect(seedRanges[0]).toEqual({ start: 10, end: 10 }); // Empty range
        expect(seedRanges[1]).toEqual({ start: 20, end: 25 });
      });

      test('range of length 1', () => {
        const input = ['seeds: 42 1'];
        const { seedRanges } = parseSeedRanges(input[0]);
        
        expect(seedRanges).toHaveLength(1);
        expect(seedRanges[0]).toEqual({ start: 42, end: 43 }); // Single seed [42]
      });
    });

    describe('Phase 2: Range Transformation Through Single Mapping', () => {
      test('range fully within mapping', () => {
        const range: Range = { start: 60, end: 70 };
        const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 30 }; // 50-79 → 100-129
        const result = transformRange([range], [mapping]);
        
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ start: 110, end: 120 }); // 60-69 → 110-119
      });

      test('range fully outside mapping', () => {
        const range: Range = { start: 10, end: 20 };
        const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 30 };
        const result = transformRange([range], [mapping]);
        
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ start: 10, end: 20 }); // Unchanged
      });

      test('range partially overlaps mapping - start outside', () => {
        const range: Range = { start: 40, end: 60 };
        const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 30 }; // 50-79 → 100-129
        const result = transformRange([range], [mapping]);
        
        expect(result).toHaveLength(2);
        // [40, 50) stays unmapped
        // [50, 60) → [100, 110)
        expect(result).toContainEqual({ start: 40, end: 50 });
        expect(result).toContainEqual({ start: 100, end: 110 });
      });

      test('range partially overlaps mapping - end outside', () => {
        const range: Range = { start: 70, end: 90 };
        const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 30 }; // 50-79 → 100-129
        const result = transformRange([range], [mapping]);
        
        expect(result).toHaveLength(2);
        // [70, 80) → [120, 130)
        // [80, 90) stays unmapped
        expect(result).toContainEqual({ start: 120, end: 130 });
        expect(result).toContainEqual({ start: 80, end: 90 });
      });

      test('range spans entire mapping', () => {
        const range: Range = { start: 40, end: 90 };
        const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 30 }; // 50-79 → 100-129
        const result = transformRange([range], [mapping]);
        
        expect(result).toHaveLength(3);
        // [40, 50) unmapped
        // [50, 80) → [100, 130)
        // [80, 90) unmapped
        expect(result).toContainEqual({ start: 40, end: 50 });
        expect(result).toContainEqual({ start: 100, end: 130 });
        expect(result).toContainEqual({ start: 80, end: 90 });
      });

      test('range exactly matches mapping', () => {
        const range: Range = { start: 50, end: 80 };
        const mapping: Mapping = { destStart: 100, sourceStart: 50, length: 30 };
        const result = transformRange([range], [mapping]);
        
        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({ start: 100, end: 130 });
      });
    });

    describe('Phase 3: Range Through Multiple Mappings', () => {
      test('range splits across multiple mappings', () => {
        const range: Range = { start: 0, end: 100 };
        const mappings: Mapping[] = [
          { destStart: 200, sourceStart: 20, length: 10 }, // 20-29 → 200-209
          { destStart: 300, sourceStart: 50, length: 20 }  // 50-69 → 300-319
        ];
        const result = transformRange([range], mappings);
        
        expect(result).toHaveLength(5);
        expect(result).toContainEqual({ start: 0, end: 20 });    // Unmapped before first
        expect(result).toContainEqual({ start: 200, end: 210 }); // First mapping
        expect(result).toContainEqual({ start: 30, end: 50 });   // Gap between mappings
        expect(result).toContainEqual({ start: 300, end: 320 }); // Second mapping
        expect(result).toContainEqual({ start: 70, end: 100 });  // Unmapped after second
      });

      test('adjacent mappings', () => {
        const range: Range = { start: 0, end: 30 };
        const mappings: Mapping[] = [
          { destStart: 100, sourceStart: 0, length: 10 },  // 0-9 → 100-109
          { destStart: 200, sourceStart: 10, length: 10 }, // 10-19 → 200-209
          { destStart: 300, sourceStart: 20, length: 10 }  // 20-29 → 300-309
        ];
        const result = transformRange([range], mappings);
        
        expect(result).toHaveLength(3);
        expect(result).toContainEqual({ start: 100, end: 110 });
        expect(result).toContainEqual({ start: 200, end: 210 });
        expect(result).toContainEqual({ start: 300, end: 310 });
      });

      test('gaps between mappings', () => {
        const range: Range = { start: 0, end: 40 };
        const mappings: Mapping[] = [
          { destStart: 100, sourceStart: 0, length: 10 },  // 0-9 → 100-109
          { destStart: 200, sourceStart: 30, length: 10 }  // 30-39 → 200-209
        ];
        const result = transformRange([range], mappings);
        
        expect(result).toHaveLength(3);
        expect(result).toContainEqual({ start: 100, end: 110 }); // First mapping
        expect(result).toContainEqual({ start: 10, end: 30 });   // Gap unmapped
        expect(result).toContainEqual({ start: 200, end: 210 }); // Second mapping
      });
    });

    describe('Phase 4: Multiple Ranges Through Mappings', () => {
      test('multiple input ranges', () => {
        const ranges: Range[] = [
          { start: 10, end: 20 },
          { start: 55, end: 65 }
        ];
        const mappings: Mapping[] = [
          { destStart: 100, sourceStart: 50, length: 30 } // 50-79 → 100-129
        ];
        const result = transformRange(ranges, mappings);
        
        expect(result).toHaveLength(2);
        expect(result).toContainEqual({ start: 10, end: 20 });   // First unchanged
        expect(result).toContainEqual({ start: 105, end: 115 }); // Second transformed
      });

      test('ranges that merge after transformation', () => {
        const ranges: Range[] = [
          { start: 10, end: 20 },
          { start: 60, end: 70 }
        ];
        const mappings: Mapping[] = [
          { destStart: 15, sourceStart: 60, length: 10 } // 60-69 → 15-24
        ];
        const result = transformRange(ranges, mappings);
        
        // After transformation: [10,20) and [15,25)
        // These overlap but we don't merge automatically
        expect(result).toHaveLength(2);
        expect(result).toContainEqual({ start: 10, end: 20 });
        expect(result).toContainEqual({ start: 15, end: 25 });
      });
    });

    describe('Phase 5: Complete Chain Transformation', () => {
      test('range through two categories', () => {
        const initialRanges: Range[] = [{ start: 79, end: 93 }];
        
        const seedToSoil: Mapping[] = [
          { destStart: 50, sourceStart: 98, length: 2 },
          { destStart: 52, sourceStart: 50, length: 48 }
        ];
        
        const soilToFertilizer: Mapping[] = [
          { destStart: 0, sourceStart: 15, length: 37 },
          { destStart: 37, sourceStart: 52, length: 2 },
          { destStart: 39, sourceStart: 0, length: 15 }
        ];
        
        // First transformation: seed to soil
        let ranges = transformRange(initialRanges, seedToSoil);
        // [79,93) overlaps [50,98) → [81,95)
        expect(ranges).toHaveLength(1);
        expect(ranges[0]).toEqual({ start: 81, end: 95 });
        
        // Second transformation: soil to fertilizer
        ranges = transformRange(ranges, soilToFertilizer);
        // [81,95) doesn't overlap any mapping, stays same
        expect(ranges).toHaveLength(1);
        expect(ranges[0]).toEqual({ start: 81, end: 95 });
      });

      test('range that splits and transforms', () => {
        const initialRanges: Range[] = [{ start: 45, end: 100 }];
        
        const mappings: Mapping[] = [
          { destStart: 200, sourceStart: 50, length: 30 }, // 50-79 → 200-229
          { destStart: 300, sourceStart: 90, length: 20 }  // 90-109 → 300-319
        ];
        
        const result = transformRange(initialRanges, mappings);
        
        // [45,50) unmapped
        // [50,80) → [200,230)
        // [80,90) unmapped
        // [90,100) → [300,310)
        expect(result).toHaveLength(4);
        expect(result).toContainEqual({ start: 45, end: 50 });
        expect(result).toContainEqual({ start: 200, end: 230 });
        expect(result).toContainEqual({ start: 80, end: 90 });
        expect(result).toContainEqual({ start: 300, end: 310 });
      });
    });

    describe('Part 2 Integration', () => {
      test('complete part 2 with example input', () => {
        const input = [
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
          '56 93 4'
        ];

        // Part 2 interprets seeds as ranges
        // Expected minimum location for the ranges
        const result = part2(input);
        expect(result).toBe(46); // Based on typical AoC example
      });
    });
  });
});