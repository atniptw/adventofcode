import { mullItOver, mullIt } from "../src/day-three";

describe('Day 3: Mull It Over', () => {
    describe('Part 1', () => {
        it('should handle non-corrupted string', () => {
            const input = 'mul(2,4)';

            expect(mullIt(input)).toBe(8);
        });
        it('should aggregate', () => {
            const input = 'mul(2,4)mul(5,5)';

            expect(mullIt(input)).toBe(33);
        });
        it('should handle complex string', () => {
            const input = 'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';

            expect(mullIt(input)).toBe(161);
        });
    });
    describe('Part 2', () => {
        it('should handle do/do not', () => {
            const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

            expect(mullItOver(input)).toBe(48);
        });
        it('should handle multiple', () => {
            const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

            expect(mullItOver(input)).toBe(96);
        });
    });
});