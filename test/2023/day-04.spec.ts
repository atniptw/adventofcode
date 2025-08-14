import { describe, test, expect } from 'vitest';
import { part1, part2 } from '../../src/2023/day-04';

describe('Day 4: Scratchcards', () => {
  describe('Part 1: Calculate Points', () => {
    describe('Basic Examples', () => {
      test('example from AoC - multiple cards with varying matches', () => {
        const input = [
          'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
          'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
          'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
          'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
          'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
          'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
        ];
        // Card 1: 4 matches (48, 83, 17, 86) = 8 points
        // Card 2: 2 matches (32, 61) = 2 points
        // Card 3: 2 matches (1, 21) = 2 points
        // Card 4: 1 match (84) = 1 point
        // Card 5: 0 matches = 0 points
        // Card 6: 0 matches = 0 points
        // Total: 8 + 2 + 2 + 1 + 0 + 0 = 13
        expect(part1(input)).toBe(13);
      });

      test('single card with one match = 1 point', () => {
        expect(part1(['Card 1: 41 48 | 83 48'])).toBe(1);
      });

      test('single card with two matches = 2 points', () => {
        expect(part1(['Card 1: 41 48 | 41 48'])).toBe(2);
      });

      test('single card with three matches = 4 points', () => {
        expect(part1(['Card 1: 41 48 83 | 41 48 83'])).toBe(4);
      });

      test('single card with four matches = 8 points', () => {
        expect(part1(['Card 1: 41 48 83 86 | 41 48 83 86'])).toBe(8);
      });

      test('points double with each additional match', () => {
        // Verify the doubling pattern: 1, 2, 4, 8, 16, 32...
        const testCases = [
          { matches: 1, expected: 1 },
          { matches: 2, expected: 2 },
          { matches: 3, expected: 4 },
          { matches: 4, expected: 8 },
          { matches: 5, expected: 16 },
          { matches: 6, expected: 32 },
          { matches: 7, expected: 64 },
          { matches: 8, expected: 128 }
        ];

        testCases.forEach(({ matches, expected }) => {
          const numbers = Array.from({ length: matches }, (_, i) => i + 1).join(' ');
          const input = [`Card 1: ${numbers} | ${numbers}`];
          expect(part1(input)).toBe(expected);
        });
      });
    });

    describe('Edge Cases', () => {
      test('no matches = 0 points', () => {
        expect(part1(['Card 1: 41 48 83 | 1 2 3'])).toBe(0);
      });

      test('empty input', () => {
        expect(part1([])).toBe(0);
      });

      test('card with no winning numbers section', () => {
        expect(part1(['Card 1: | 41 48 83'])).toBe(0);
      });

      test('card with no your numbers section', () => {
        expect(part1(['Card 1: 41 48 83 |'])).toBe(0);
      });

      test('card with empty both sections', () => {
        expect(part1(['Card 1: |'])).toBe(0);
      });

      test('multiple cards with no matches', () => {
        const input = [
          'Card 1: 1 2 3 | 4 5 6',
          'Card 2: 7 8 9 | 10 11 12',
          'Card 3: 13 14 15 | 16 17 18'
        ];
        expect(part1(input)).toBe(0);
      });

      test('all numbers match', () => {
        const input = ['Card 1: 1 2 3 4 5 6 7 8 9 10 | 1 2 3 4 5 6 7 8 9 10'];
        // 10 matches = 2^9 = 512 points
        expect(part1(input)).toBe(512);
      });
    });

    describe('Duplicate Number Handling', () => {
      test('duplicate in winning numbers - matches once', () => {
        // If winning has duplicates, should still only match once
        expect(part1(['Card 1: 41 41 41 | 41'])).toBe(1);
      });

      test('duplicate in your numbers - matches once', () => {
        // If your numbers has duplicates, should still only match once
        expect(part1(['Card 1: 41 | 41 41 41'])).toBe(1);
      });

      test('duplicates in both sections', () => {
        expect(part1(['Card 1: 41 41 48 48 | 41 41 48 48'])).toBe(2);
      });

      test('multiple cards with duplicates', () => {
        const input = [
          'Card 1: 1 1 2 2 | 1 1 2 2',  // 2 unique matches = 2 points
          'Card 2: 3 3 3 | 3 3 3',      // 1 unique match = 1 point
          'Card 3: 4 4 | 5 5'           // 0 matches = 0 points
        ];
        expect(part1(input)).toBe(3);
      });
    });

    describe('Format Robustness', () => {
      test('handles variable spacing between numbers', () => {
        const inputs = [
          'Card 1: 41 48 | 83 48',
          'Card 1:41 48|83 48',
          'Card 1: 41  48 | 83  48',
          'Card 1:  41   48  |  83   48  '
        ];
        inputs.forEach(input => {
          expect(part1([input])).toBe(1);
        });
      });

      test('handles different card number formats', () => {
        const input = [
          'Card   1: 41 | 41',
          'Card  10: 42 | 42',
          'Card 100: 43 | 43',
          'Card 999: 44 | 44'
        ];
        expect(part1(input)).toBe(4);
      });

      test('handles trailing spaces', () => {
        const input = [
          'Card 1: 41 48 | 83 48   ',
          'Card 2: 13 32 | 61 32   '
        ];
        expect(part1(input)).toBe(2);
      });

      test('handles mixed single and double digit numbers', () => {
        const input = [
          'Card 1: 1 10 99 | 1 10 99',
          'Card 2: 5 50 | 5 50'
        ];
        expect(part1(input)).toBe(6); // 4 + 2
      });
    });

    describe('Large Scale Tests', () => {
      test('many matches (up to 20)', () => {
        const numbers = Array.from({ length: 20 }, (_, i) => i + 1).join(' ');
        const input = [`Card 1: ${numbers} | ${numbers}`];
        // 20 matches = 2^19 = 524288 points
        expect(part1(input)).toBe(524288);
      });

      test('100 cards with varying matches', () => {
        const input = Array.from({ length: 100 }, (_, i) => {
          const matchCount = i % 5; // 0-4 matches repeating
          if (matchCount === 0) {
            return `Card ${i + 1}: 1 2 3 | 4 5 6`;
          }
          const winning = Array.from({ length: matchCount }, (_, j) => j + 1).join(' ');
          const yours = Array.from({ length: matchCount + 2 }, (_, j) => j + 1).join(' ');
          return `Card ${i + 1}: ${winning} | ${yours}`;
        });
        
        // 20 cards with 0 matches = 0 points each
        // 20 cards with 1 match = 1 point each = 20
        // 20 cards with 2 matches = 2 points each = 40
        // 20 cards with 3 matches = 4 points each = 80
        // 20 cards with 4 matches = 8 points each = 160
        // Total: 0 + 20 + 40 + 80 + 160 = 300
        expect(part1(input)).toBe(300);
      });
    });

    describe('Number Range Tests', () => {
      test('handles zero as a valid number', () => {
        expect(part1(['Card 1: 0 1 2 | 0 1 2'])).toBe(4);
      });

      test('handles large numbers (90s)', () => {
        expect(part1(['Card 1: 90 91 92 93 94 95 96 97 98 99 | 90 91 92 93 94 95 96 97 98 99'])).toBe(512);
      });

      test('handles numbers 1-99 range', () => {
        const input = ['Card 1: 1 25 50 75 99 | 1 25 50 75 99'];
        expect(part1(input)).toBe(16);
      });
    });
  });

  describe('Part 2: Cascading Card Copies', () => {
    describe('Requirement Clarification', () => {
      test('single card with one win copies next card', () => {
        const input = [
          'Card 1: 1 | 1',     // 1 match → copy of Card 2
          'Card 2: 2 | 3'      // 0 matches
        ];
        // Original: Card 1, Card 2 = 2 cards
        // Card 1 wins → copy of Card 2 = +1 card
        // Total: 3 cards
        expect(part2(input)).toBe(3);
      });

      test('copied cards can win more copies', () => {
        const input = [
          'Card 1: 1 | 1',     // 1 match → copy of Card 2
          'Card 2: 2 | 2',     // 1 match → copy of Card 3
          'Card 3: 3 | 4'      // 0 matches
        ];
        // Original: 3 cards
        // Card 1 wins → copy Card 2
        // Original Card 2 wins → copy Card 3
        // Copy Card 2 wins → copy Card 3
        // Total: 3 original + 1 copy Card 2 + 2 copies Card 3 = 6 cards
        expect(part2(input)).toBe(6);
      });

      test('wins beyond deck size are ignored', () => {
        const input = [
          'Card 1: 1 | 2',               // 0 matches
          'Card 2: 1 2 3 4 5 | 1 2 3 4 5' // 5 matches but no cards after
        ];
        // No cascading happens, just original cards
        expect(part2(input)).toBe(2);
      });

      test('uses array position for "next N cards"', () => {
        const input = [
          'Card 1: 1 | 1',     // 1 match → copy position 1 (Card 2)
          'Card 2: 2 | 3'      // 0 matches
        ];
        expect(part2(input)).toBe(3);
      });

      test('last card with wins does nothing', () => {
        const input = [
          'Card 1: 1 | 2',               // 0 matches
          'Card 2: 1 2 3 | 1 2 3'        // 3 matches but no more cards
        ];
        expect(part2(input)).toBe(2);
      });
    });

    describe('Cascading Mechanics', () => {
      test('simple two-level cascade', () => {
        const input = [
          'Card 1: 1 2 | 1 2',   // 2 matches → copies of Cards 2,3
          'Card 2: 3 | 3',       // 1 match → copy of Card 3
          'Card 3: 4 | 5'        // 0 matches
        ];
        // Original: 3 cards
        // Card 1 wins 2 → copies of Cards 2,3 (+2 cards)
        // Original Card 2 wins 1 → copy of Card 3 (+1 card)
        // Copy Card 2 wins 1 → copy of Card 3 (+1 card)
        // Total: 3 + 2 + 1 + 1 = 7 cards
        expect(part2(input)).toBe(7);
      });

      test('exponential cascade growth', () => {
        const input = [
          'Card 1: 1 2 | 1 2',   // 2 matches → copies Cards 2,3
          'Card 2: 3 4 | 3 4',   // 2 matches → copies Cards 3,4
          'Card 3: 5 6 | 5 6',   // 2 matches → copies Cards 4,5
          'Card 4: 7 8 | 7 8',   // 2 matches → copies Cards 5,6 (but no Card 6)
          'Card 5: 9 | 10'       // 0 matches
        ];
        // Original: 5 cards
        // Card 1 (1x): wins 2 → +1 Card 2, +1 Card 3 (totals: [1,2,2,1,1])
        // Card 2 (2x): each wins 2 → +2 Card 3, +2 Card 4 (totals: [1,2,4,3,1])
        // Card 3 (4x): each wins 2 → +4 Card 4, +4 Card 5 (totals: [1,2,4,7,5])
        // Card 4 (7x): each wins 2 → +7 Card 5 (totals: [1,2,4,7,12])
        // Card 5 (12x): no wins
        // Total: 1 + 2 + 4 + 7 + 12 = 26 cards
        expect(part2(input)).toBe(26);
      });

      test('cascade termination at deck end', () => {
        const input = [
          'Card 1: 1 2 3 | 1 2 3',  // 3 matches → copies Cards 2,3,4
          'Card 2: 4 5 | 4 5',      // 2 matches → copies Cards 3,4
          'Card 3: 6 7 | 6 7',      // 2 matches → copies Cards 4,5 (but no Card 5)
          'Card 4: 8 | 9'           // 0 matches
        ];
        // Original: 4 cards
        // Card 1: wins 3 → +1 each of Cards 2,3,4 (total: 2,2,2)
        // Card 2 (2x): each wins 2 → +2 Card 3, +2 Card 4 (total: 4,4)
        // Card 3 (4x): each wins 2 → +4 Card 4 (total: 8)
        // Card 4 (8x): no wins
        // Total: 1 + 2 + 4 + 8 = 15 cards
        expect(part2(input)).toBe(15);
      });

      test('mixed win patterns', () => {
        const input = [
          'Card 1: 1 | 1',       // 1 match → copy Card 2
          'Card 2: 2 3 4 | 2',   // 1 match → copy Card 3
          'Card 3: 5 | 6',       // 0 matches
          'Card 4: 7 | 7'        // 1 match → copy Card 5 (no Card 5)
        ];
        // Original: 4 cards
        // Card 1: wins 1 → +1 Card 2 (total: 2 Card 2s)
        // Card 2 (2x): each wins 1 → +2 Card 3 (total: 3 Card 3s)
        // Card 3 (3x): no wins
        // Card 4 (1x): wins 1 but no Card 5
        // Total: 1 + 2 + 3 + 1 = 7 cards
        expect(part2(input)).toBe(7);
      });
    });

    describe('Edge Cases', () => {
      test('empty input', () => {
        expect(part2([])).toBe(0);
      });

      test('single card with no wins', () => {
        expect(part2(['Card 1: 1 | 2'])).toBe(1);
      });

      test('single card with wins but no target cards', () => {
        expect(part2(['Card 1: 1 2 3 | 1 2 3'])).toBe(1);
      });

      test('all cards have no wins', () => {
        const input = [
          'Card 1: 1 2 3 | 4 5 6',
          'Card 2: 7 8 9 | 10 11 12',
          'Card 3: 13 14 15 | 16 17 18'
        ];
        expect(part2(input)).toBe(3);
      });

      test('cards with empty sections', () => {
        const input = [
          'Card 1: | 1 2 3',    // No winning numbers
          'Card 2: 1 2 3 |',    // No your numbers
          'Card 3: |'           // Both empty
        ];
        expect(part2(input)).toBe(3);
      });

      test('maximum matches scenario', () => {
        // Card wins maximum possible matches
        const numbers = Array.from({length: 10}, (_, i) => i + 1).join(' ');
        const input = [
          `Card 1: ${numbers} | ${numbers}`,  // 10 matches
          `Card 2: 11 | 12`,
          `Card 3: 13 | 14`,
          `Card 4: 15 | 16`,
          `Card 5: 17 | 18`,
          `Card 6: 19 | 20`,
          `Card 7: 21 | 22`,
          `Card 8: 23 | 24`,
          `Card 9: 25 | 26`,
          `Card 10: 27 | 28`,
          `Card 11: 29 | 30`
        ];
        // Card 1 wins 10 → copies Cards 2-11 (10 copies)
        // Total: 11 original + 10 copies = 21 cards
        expect(part2(input)).toBe(21);
      });
    });

    describe('Performance & Scale', () => {
      test('handles large cascade without timeout', () => {
        // Create scenario that could cause exponential growth
        const input = Array.from({length: 20}, (_, i) => {
          if (i < 10) {
            return `Card ${i + 1}: 1 2 | 1 2`;  // Each wins 2 copies
          } else {
            return `Card ${i + 1}: 3 | 4`;      // No wins to limit growth
          }
        });
        
        // Should complete without timeout
        const result = part2(input);
        expect(result).toBeGreaterThan(20);
        expect(result).toBeLessThan(1000000); // Reasonable upper bound
      });

      test('processing order is deterministic', () => {
        const input = [
          'Card 1: 1 2 | 1 2',
          'Card 2: 3 4 | 3 4',
          'Card 3: 5 6 | 5 6'
        ];
        
        // Run multiple times, should always get same result
        const results = Array.from({length: 5}, () => part2(input));
        expect(results.every(r => r === results[0])).toBe(true);
      });

      test('no integer overflow with large numbers', () => {
        // This test ensures we don't get unexpected results from overflow
        const input = Array.from({length: 50}, (_, i) => {
          return `Card ${i + 1}: 1 | ${i < 25 ? '1' : '2'}`;
        });
        
        const result = part2(input);
        expect(result).toBeGreaterThan(0);
        expect(Number.isInteger(result)).toBe(true);
      });
    });

    describe('Real-world Validation', () => {
      test('example from AoC matches expected pattern', () => {
        // Based on typical AoC examples for this type of problem
        const input = [
          'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53', // 4 matches
          'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19', // 2 matches  
          'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1', // 2 matches
          'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83', // 1 match
          'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36', // 0 matches
          'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'  // 0 matches
        ];
        
        // Card 1: 4 matches → copies Cards 2,3,4,5 (totals: 2,2,2,2,1,1)
        // Card 2 (2x): 2 matches each → +2 Card 3, +2 Card 4 (totals: 2,4,4,2,1,1)  
        // Card 3 (4x): 2 matches each → +4 Card 4, +4 Card 5 (totals: 2,4,8,6,1,1)
        // Card 4 (8x): 1 match each → +8 Card 5 (totals: 2,4,8,14,1,1)
        // Cards 5,6: no wins
        // Total: 1 + 2 + 4 + 8 + 14 + 1 = 30 cards
        expect(part2(input)).toBe(30);
      });
    });
  });
});