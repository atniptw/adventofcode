import { canSolve, parseEquation, part1, part2, unconcat } from './day-07.js';

const example = [
  '190: 10 19',
  '3267: 81 40 27',
  '83: 17 5',
  '156: 15 6',
  '7290: 6 8 6 15',
  '161011: 16 10 13',
  '192: 17 8 14',
  '21037: 9 7 18 13',
  '292: 11 6 16 20',
];

describe('Day 07', () => {
  test.each([
    { line: '190: 10 19', expected: { target: 190, values: [10, 19] } },
    { line: '3267: 81 40 27', expected: { target: 3267, values: [81, 40, 27] } },
    // a single value: nothing after it to split
    { line: '5: 5', expected: { target: 5, values: [5] } },
    // real inputs have targets far past 32 bits; still exact as a Number
    { line: '190000000000000: 1 2', expected: { target: 190000000000000, values: [1, 2] } },
  ])('parseEquation($line) -> $expected', ({ line, expected }) => {
    expect(parseEquation(line)).toEqual(expected);
  });

  test.each([
    // last op is *: 190 % 19 === 0, leaving 10
    { target: 190, values: [10, 19], expected: true },
    // * then +: 3267 / 27 = 121, then 121 - 40 = 81
    { target: 3267, values: [81, 40, 27], expected: true },
    // 83 % 5 !== 0 and 83 - 5 = 78 !== 17: both branches dead
    { target: 83, values: [17, 5], expected: false },
    { target: 292, values: [11, 6, 16, 20], expected: true },
    // base case: one value left must equal what remains of the target
    { target: 5, values: [5], expected: true },
    { target: 5, values: [6], expected: false },
    // * fails (121 % 40 !== 0), but + works
    { target: 121, values: [81, 40], expected: true },
    // left-to-right: (2 + 3) * 4 = 20, not 2 + 3 * 4 = 14
    { target: 20, values: [2, 3, 4], expected: true },
    { target: 14, values: [2, 3, 4], expected: false },
    // 2 - 5 is negative: + can't be the last op
    { target: 2, values: [1, 5], expected: false },
    // 6 % 2 === 0, but the * branch (3 vs [4]) dead-ends; must fall back to + (4 + 2)
    { target: 6, values: [4, 2], expected: true },
    // same trap one level up: 12 / 6 = 2 can't come from [2, 3], but 12 - 6 = 6 = 2 * 3
    { target: 12, values: [2, 3, 6], expected: true },
  ])('canSolve($target, $values) -> $expected', ({ target, values, expected }) => {
    expect(canSolve(target, values)).toBe(expected);
  });

  test("canSolve doesn't modify the values array", () => {
    const values = [5];
    canSolve(5, values);
    expect(values).toEqual([5]);
  });

  test.each([
    // undo `15 || 6`: strip the trailing digits, keep what's in front
    { target: 156, last: 6, expected: 15 },
    { target: 486, last: 6, expected: 48 },
    // 156 doesn't end in 5, so || can't have been last
    { target: 156, last: 5, expected: undefined },
    // multi-digit last: strip as many digits as last has
    { target: 1234, last: 34, expected: 12 },
    { target: 1234, last: 234, expected: 1 },
    { target: 110, last: 10, expected: 1 },
    // 105 % 10 !== 0 isn't the check: it has to end in the digits "10"
    { target: 105, last: 10, expected: undefined },
    // ends in "000", not "100"
    { target: 1000, last: 100, expected: undefined },
    { target: 2100, last: 100, expected: 2 },
    // nothing left in front: there's no number for || to have joined to
    { target: 6, last: 6, expected: undefined },
    // targets past 32 bits
    { target: 123456789012345, last: 345, expected: 123456789012 },
  ])('unconcat($target, $last) -> $expected', ({ target, last, expected }) => {
    expect(unconcat(target, last)).toBe(expected);
  });

  test.each([
    { target: 156, values: [15, 6], expected: true },
    // || in the middle of the chain: 6 * 8 || 6 * 15 → undo * 15, then || 6, then * 8
    { target: 7290, values: [6, 8, 6, 15], expected: true },
    // || then +: 17 || 8 + 14 → undo + 14 (178), then || 8
    { target: 192, values: [17, 8, 14], expected: true },
    { target: 83, values: [17, 5], expected: false },
    { target: 161011, values: [16, 10, 13], expected: false },
    // * and + still work with concat on
    { target: 190, values: [10, 19], expected: true },
    // all ||
    { target: 1234, values: [1, 2, 3, 4], expected: true },
    // none of 12, 36, 66 is 6
    { target: 6, values: [6, 6], expected: false },
    { target: 5, values: [5], expected: true },
  ])('canSolve($target, $values, allowConcat) -> $expected', ({ target, values, expected }) => {
    expect(canSolve(target, values, true)).toBe(expected);
  });

  test.each([
    { target: 156, values: [15, 6] },
    { target: 7290, values: [6, 8, 6, 15] },
    { target: 1234, values: [1, 2, 3, 4] },
  ])('canSolve($target, $values) without concat -> false', ({ target, values }) => {
    expect(canSolve(target, values, false)).toBe(false);
    expect(canSolve(target, values)).toBe(false);
  });

  test.each([
    { input: example, expected: 3749 },
    // one operator position: only * works
    { input: ['190: 10 19'], expected: 190 },
    // a single number needs no operators; it either already matches or it doesn't
    { input: ['5: 5'], expected: 5 },
    { input: ['5: 6'], expected: 0 },
    // left-to-right: (2 + 3) * 4 = 20, even though precedence would give 14
    { input: ['20: 2 3 4'], expected: 20 },
    // ...and 14 isn't reachable left-to-right at all
    { input: ['14: 2 3 4'], expected: 0 },
    // two ways to make it (2 + 2 and 2 * 2), but the test value is only counted once
    { input: ['4: 2 2'], expected: 4 },
    // divisible by the last value, but only + works
    { input: ['6: 4 2'], expected: 6 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: example, expected: 11387 },
    { input: ['156: 15 6'], expected: 156 },
    // part 1's solvable lines still count
    { input: ['190: 10 19'], expected: 190 },
    { input: ['5: 5'], expected: 5 },
    { input: ['83: 17 5'], expected: 0 },
    { input: ['1234: 1 2 3 4'], expected: 1234 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
