import { getOrThrow } from '../utils/index.js';

function run(program: string[]): { acc: number; terminated: boolean } {
  const visited = new Set<number>();

  let i = 0;
  let acc = 0;
  while (!visited.has(i)) {
    if (i >= program.length) {
      return { acc, terminated: true };
    }
    visited.add(i);
    const instruction = getOrThrow(program[i]);
    const [, op, val] = getOrThrow(instruction.match(/^(acc|jmp|nop) ([+-]\d+)$/));

    switch (op) {
      case 'acc':
        acc += Number(val);
        i++;
        continue;
      case 'jmp':
        i += Number(val);
        continue;
      case 'nop':
        i++;
        continue;
      default:
        continue;
    }
  }

  return { acc, terminated: false };
}

export function part1(input: string[]): number {
  return run(input).acc;
}

export function part2(input: string[]): number {
  for (let i = 0; i < input.length; i++) {
    const instruction = getOrThrow(input[i]);
    const [, op] = getOrThrow(instruction.match(/^(acc|jmp|nop) ([+-]\d+)$/));
    if (op === 'acc') continue;

    const program = [...input];
    program[i] = instruction.replace(getOrThrow(op), op === 'jmp' ? 'nop' : 'jmp');
    const { acc, terminated } = run(program);
    if (terminated) return acc;
  }
  throw new Error('No solution found');
}
