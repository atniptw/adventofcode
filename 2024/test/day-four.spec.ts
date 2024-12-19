import { solvePuzzle } from "../src/day-four";

describe('Day 4: Ceres Search', () => {
    describe('Part 1', () => {
        it('should find count of \'XMAS\'', () => {
            const input = ['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM', 'MSAMASMSMX', 'XMASAMXAMM', 'XXAMMXXAMA', 'SMSMSASXSS', 'SAXAMASAAA', 'MAMMMXMMMM', 'MXMXAXMASX'];

            expect(solvePuzzle(input)).toBe(18);
        });
        it('should not loop', () => {
            const input = ['AS....XMASXM'];

            expect(solvePuzzle(input)).toBe(1);
        });
    });
});