import { parseNumberColumns, frequency } from '@aoc/utils';

function parseInput(input: string[]): [number[], number[]] {
    const columns = parseNumberColumns(input, '   ');
    return [columns[0], columns[1]];
}

export function part1(input: string[]): number {
    const [one, two] = parseInput(input);
    
    one.sort();
    two.sort();
    
    return one.reduce((sum, val, i) => sum + Math.abs(val - two[i]), 0);
}

export function part2(input: string[]): number {
    const [one, two] = parseInput(input);
    const twoFreq = frequency(two);
    
    return one.reduce((sum, element) => {
        return sum + (element * (twoFreq.get(element) || 0));
    }, 0);
}

export function dayOne(reader: readline.Interface) {
    const one: number[] = [];
    const two: number[] = [];
    reader.on('line', (line) => {
      const [a, b] = line.split('   ');
      one.push(parseInt(a));
      two.push(parseInt(b));
    })
      .on('close', () => {
        console.log(`Day One Part One: ${part1(one, two)}`);
        console.log(`Day One Part Two: ${part2(one, two)}`);
      });  
}