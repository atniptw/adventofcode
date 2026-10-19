import { part1, part2 } from './day-03.js';

const example = ['xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'];
const example2 = ["xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"];

describe('Day 03', () => {
  test.each([
    { input: example, expected: 161 },
    // a single valid instruction
    { input: ['mul(44,46)'], expected: 2024 },
    // 3 digits is the max on either side
    { input: ['mul(999,999)'], expected: 998001 },
    { input: ['mul(1234,5)'], expected: 0 },
    { input: ['mul(5,1234)'], expected: 0 },
    // no whitespace, signs, or other casing allowed
    { input: ['mul( 2,3)'], expected: 0 },
    { input: ['mul ( 2 , 4 )'], expected: 0 },
    { input: ['mul(-2,3)'], expected: 0 },
    { input: ['Mul(2,3)'], expected: 0 },
    // the corrupted fragments called out in the prompt
    { input: ['mul(4*'], expected: 0 },
    { input: ['mul(6,9!'], expected: 0 },
    { input: ['?(12,34)'], expected: 0 },
    // a valid instruction can directly follow junk that looks like the start of one
    { input: ['mulmul(2,3)'], expected: 6 },
    // an unclosed instruction at the end doesn't count
    { input: ['mul(2,3)mul(4,5'], expected: 6 },
    // instructions are summed across every line of input
    { input: ['mul(2,3)', 'mul(4,5)'], expected: 26 },
    { input: [''], expected: 0 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    { input: example2, expected: 48 },
    // with no do()/don't() at all, everything is enabled (same as part 1)
    { input: example, expected: 161 },
    // don't() disables, do() re-enables
    { input: ["don't()mul(2,3)"], expected: 0 },
    { input: ["don't()mul(2,3)do()mul(4,5)"], expected: 20 },
    { input: ["do()mul(2,3)don't()mul(4,5)"], expected: 6 },
    // only the most recent toggle matters; repeats don't stack
    { input: ["don't()don't()do()mul(2,3)"], expected: 6 },
    { input: ['do()do()mul(2,3)'], expected: 6 },
    // malformed toggles do nothing
    { input: ['dont()mul(2,3)'], expected: 6 },
    { input: ["don't ()mul(2,3)"], expected: 6 },
    { input: ["don't(mul(2,3)"], expected: 6 },
    { input: ["don't()mul(2,3)do(1)mul(4,5)"], expected: 0 },
    { input: ["don't()mul(2,3)Do()mul(4,5)"], expected: 0 },
    // enabled/disabled state carries across lines; it does not reset per line
    { input: ["don't()mul(2,3)", 'mul(4,5)'], expected: 0 },
    { input: ["mul(2,3)don't()", 'do()mul(4,5)'], expected: 26 },
    { input: [''], expected: 0 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
