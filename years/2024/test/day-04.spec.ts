import { part1 } from "../src/day-four";

describe('Day 4: Ceres Search', () => {
    describe('Part 1', () => {
        it.each([
            [['AS....XMASXM'], 1],
            [['XMAS'], 1],
            [['SAMX'], 1],
            [['AS....XMSAMX'], 1],
            [['X', 'M', 'A', 'S'], 1],
            [['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM', 'MSAMASMSMX', 'XMASAMXAMM', 'XXAMMXXAMA', 'SMSMSASXSS', 'SAXAMASAAA', 'MAMMMXMMMM', 'MXMXAXMASX'], 18],
        ])('should solve puzzle', (input, count) => {
            expect(part1(input)).toBe(count);
        });
    });
});