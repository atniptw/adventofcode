import { part1, part2 } from './day-05.js';

const example = [
  '47|53',
  '97|13',
  '97|61',
  '97|47',
  '75|29',
  '61|13',
  '75|53',
  '29|13',
  '97|29',
  '53|29',
  '61|53',
  '97|53',
  '61|29',
  '47|13',
  '75|47',
  '97|75',
  '47|61',
  '75|61',
  '47|29',
  '75|13',
  '53|13',
  '',
  '75,47,61,53,29',
  '97,61,53,29,13',
  '75,29,13',
  '75,97,47,61,53',
  '61,13,29',
  '97,13,75,29,47',
];

describe('Day 05', () => {
  test.each([
    { input: example, expected: 143 },
    // rules involving pages not in the update are ignored
    { input: ['1|2', '', '5,7,9'], expected: 7 },
    // a single-page update is trivially ordered; its middle is itself
    { input: ['1|2', '', '42'], expected: 42 },
    // the violating pair doesn't have to be adjacent
    { input: ['1|2', '', '2,5,1'], expected: 0 },
    { input: ['1|2', '', '1,5,2'], expected: 5 },
    // only correctly-ordered updates contribute
    { input: ['1|2', '', '1,5,2', '2,6,1', '3,7,4'], expected: 12 },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  // every pair from 1..5 ordered ascending, so any update over these pages has one valid order
  const ascending1to5 = ['1|2', '1|3', '1|4', '1|5', '2|3', '2|4', '2|5', '3|4', '3|5', '4|5'];

  test.each([
    { input: example, expected: 123 },
    // already-correct updates contribute nothing
    { input: ['1|2', '', '1,5,2'], expected: 0 },
    // reordering changes which page is in the middle (3 -> 2)
    { input: ['1|2', '1|3', '2|3', '', '2,3,1'], expected: 2 },
    // a fully scrambled five-page update; middle goes from 5 to 3
    { input: [...ascending1to5, '', '4,1,5,2,3'], expected: 3 },
    // correct update skipped, incorrect ones summed; 9|1 involves a page not in any update
    { input: [...ascending1to5, '9|1', '', '1,2,3', '2,3,1', '4,1,5,2,3'], expected: 5 },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
