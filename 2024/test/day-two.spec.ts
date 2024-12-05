import { isSafe, isSafeEnough } from "../src/day-two";

describe('Safe Reports', () => {
    it.each([
        ['Safe because the levels are all decreasing by 1 or 2.', { input: [7, 6, 4, 2, 1], safe: true }],
        ['Unsafe because 2 7 is an increase of 5.', { input: [1, 2, 7, 8, 9], safe: false }],
        ['Unsafe because 6 2 is a decrease of 4.', { input: [9, 7, 6, 2, 1], safe: false }],
        ['Unsafe because 1 3 is increasing but 3 2 is decreasing.', { input: [1, 3, 2, 4, 5], safe: false }],
        ['Unsafe because 4 4 is neither an increase or a decrease.', { input: [8, 6, 4, 4, 1], safe: false }],
        ['Safe because the levels are all increasing by 1, 2, or 3.', { input: [1, 3, 6, 7, 9], safe: true }],
    ])('%s', (scenario, { input, safe}) => {
        expect(isSafe(input)).toBe(safe);
    })
})

describe('Safe Enough Reports', () => {
    it.each([
        ['Safe without removing any level.', { input: [7, 6, 4, 2, 1], safe: true }],
        ['Unsafe regardless of which level is removed.', { input: [1, 2, 7, 8, 9], safe: false }],
        ['Unsafe regardless of which level is removed.', { input: [9, 7, 6, 2, 1], safe: false }],
        ['Safe by removing the second level, 3.', { input: [1, 3, 2, 4, 5], safe: true }],
        ['Safe by removing the third level, 4.', { input: [8, 6, 4, 4, 1], safe: true }],
        ['Safe without removing any level.', { input: [1, 3, 6, 7, 9], safe: true }],
    ])('%s', (scenario, { input, safe}) => {
        expect(isSafeEnough(input)).toBe(safe);
    })
})