import { solvePuzzle } from "../src/day-four";

describe('Day 4: Ceres Search', () => {
    describe('Part 1', () => {
        it.each([
            {input: ['AS....XMASXM'], count: 1},
            {input: ['XMAS'], count: 1},
            {input: ['SAMX'], count: 1},
            {input: ['AS....XMSAMX'], count: 1},
            {input: ['X', 'M', 'A', 'S'], count: 1},
            {input: ['MMMSXXMASM', 'MSAMXMSMSA', 'AMXSXMAAMM', 'MSAMASMSMX', 'XMASAMXAMM', 'XXAMMXXAMA', 'SMSMSASXSS', 'SAXAMASAAA', 'MAMMMXMMMM', 'MXMXAXMASX'], count: 18},
        ])('should solve puzzle', ({input, count}) => {
            expect(solvePuzzle(input)).toBe(count);
        });
    });
});