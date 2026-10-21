import { getOrThrow, sum } from '../utils/index.js';

function parse(input: string[]): { rules: Set<string>; updates: string[][] } {
  const blank = input.indexOf('');
  return {
    rules: new Set(input.slice(0, blank)),
    updates: input.slice(blank + 1).map((u) => u.split(',')),
  };
}

function isOrdered(pages: string[], rules: Set<string>): boolean {
  return pages.every((page, i) =>
    pages.slice(i + 1).every((later) => !rules.has(`${later}|${page}`))
  );
}

function middlePage(pages: string[]): number {
  return Number(getOrThrow(pages[Math.floor(pages.length / 2)]));
}

export function part1(input: string[]): number {
  const { rules, updates } = parse(input);
  return sum(updates.filter((pages) => isOrdered(pages, rules)).map(middlePage));
}

export function part2(input: string[]): number {
  const { rules, updates } = parse(input);
  return sum(
    updates
      .filter((pages) => !isOrdered(pages, rules))
      .map((pages) =>
        pages.sort((a, b) => {
          if (rules.has(`${a}|${b}`)) return -1;
          if (rules.has(`${b}|${a}`)) return 1;
          return 0;
        })
      )
      .map(middlePage)
  );
}
