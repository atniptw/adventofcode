import { parseGroups } from '../utils/index.js';

type Passport = Record<string, string>;
const REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

function parsePassport(rawPassport: string): Passport {
  const pairs = rawPassport.split(/\s+/);
  const entries = pairs.map((pair) => pair.split(':'));
  return Object.fromEntries(entries);
}

function between(input: string, lower: number, upper: number): boolean {
  return lower <= Number(input) && Number(input) <= upper;
}

function heightCheck(input: string): boolean {
  if (input?.endsWith('cm')) {
    return between(input.slice(0, -2), 150, 193);
  } else if (input?.endsWith('in')) {
    return between(input.slice(0, -2), 59, 76);
  } else {
    return false;
  }
}

export function part1(input: string[]): number {
  const passports = parseGroups(input)
    .map((passport) => parsePassport(passport))
    .filter((passport) => REQUIRED_FIELDS.every((field) => field in passport));

  return passports.length;
}

export function part2(input: string[]): number {
  const passports = parseGroups(input)
    .map((passport) => parsePassport(passport))
    .filter((passport) => REQUIRED_FIELDS.every((field) => field in passport))
    .filter((passport) => between(passport['byr'] ?? '', 1920, 2002))
    .filter((passport) => between(passport['iyr'] ?? '', 2010, 2020))
    .filter((passport) => between(passport['eyr'] ?? '', 2020, 2030))
    .filter((passport) => heightCheck(passport['hgt'] ?? ''))
    .filter((passport) => /^#[0-9a-f]{6}$/.test(passport['hcl'] ?? ''))
    .filter((passport) =>
      ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport['ecl'] ?? '')
    )
    .filter((passport) => /^\d{9}$/.test(passport['pid'] ?? ''));

  return passports.length;
}
