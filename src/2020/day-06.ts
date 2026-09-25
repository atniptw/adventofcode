import { sum, parseGroups } from '../utils/index.js';

export function part1(input: string[]): number {
  const counts = parseGroups(input)
    .map((group) => new Set(group.replace(/\s+/g, '').split('')))
    .map((answers) => answers.size);
  return sum(counts);
}

export function part2(input: string[]): number {
  const counts = parseGroups(input)
    .map((group) => group.split(/\s+/g))
    .map((people) => people.map((person) => new Set(person.split(''))))
    .map((personSets) => personSets.reduce((common, set) => common.intersection(set)))
    .map((commonAnswers) => commonAnswers.size);
  return sum(counts);
}
