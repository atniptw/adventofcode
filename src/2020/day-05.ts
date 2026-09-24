import { getOrThrow, sum } from '../utils/index.js';

function convert(passport: string): number {
  const binary = passport.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
  return Number.parseInt(binary, 2);
}

export function part1(input: string[]): number {
  return Math.max(...input.map((passport) => convert(passport)));
}

export function part2(input: string[]): number {
  const seats = input.map((passport) => convert(passport)).sort((a, b) => a - b);
  const min = getOrThrow(seats[0]);
  const max = getOrThrow(seats[seats.length - 1]);
  return ((max - min + 1) * (min + max)) / 2 - sum(seats);
}
