import { part1, part2 } from './day-07.js';

describe('Day 07', () => {
  test.each([
    {
      input: [
        'light red bags contain 1 bright white bag, 2 muted yellow bags.',
        'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
        'bright white bags contain 1 shiny gold bag.',
        'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
        'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
        'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
        'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
        'faded blue bags contain no other bags.',
        'dotted black bags contain no other bags.',
      ],
      expected: 4,
    },
    {
      // nothing eventually contains shiny gold: dark olive only contains
      // faded blue, which contains nothing
      input: [
        'shiny gold bags contain 1 dark olive bag.',
        'dark olive bags contain 1 faded blue bag.',
        'faded blue bags contain no other bags.',
      ],
      expected: 0,
    },
    {
      // direct containment, single bag type
      input: [
        'faded blue bags contain 1 shiny gold bag.',
        'shiny gold bags contain no other bags.',
      ],
      expected: 1,
    },
  ])('part1($input) -> $expected', ({ input, expected }) => {
    expect(part1(input)).toBe(expected);
  });

  test.each([
    {
      input: [
        'light red bags contain 1 bright white bag, 2 muted yellow bags.',
        'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
        'bright white bags contain 1 shiny gold bag.',
        'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
        'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
        'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
        'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
        'faded blue bags contain no other bags.',
        'dotted black bags contain no other bags.',
      ],
      expected: 32,
    },
    {
      input: [
        'shiny gold bags contain 2 dark red bags.',
        'dark red bags contain 2 dark orange bags.',
        'dark orange bags contain 2 dark yellow bags.',
        'dark yellow bags contain 2 dark green bags.',
        'dark green bags contain 2 dark blue bags.',
        'dark blue bags contain 2 dark violet bags.',
        'dark violet bags contain no other bags.',
      ],
      expected: 126,
    },
    {
      // shiny gold itself is empty
      input: ['shiny gold bags contain no other bags.'],
      expected: 0,
    },
  ])('part2($input) -> $expected', ({ input, expected }) => {
    expect(part2(input)).toBe(expected);
  });
});
