import { part2, part1 } from "../src/day-three";

describe('Day 3: Mull It Over', () => {
    describe('Part 1', () => {
        it.each([
            ['mul(2,4)', 8],
            ['mul(2,4)mul(5,5)', 33],
            ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))', 161],
        ])('should handle %s', (input, expected) => {
            expect(part1(input)).toBe(expected);
        });
    });
    describe('Part 2', () => {
        it.each([
            ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", 48],
            ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", 96]
        ])('should handle %s', (input, expected) => {
            expect(part2(input)).toBe(expected);
        });
    });
});