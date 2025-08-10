import { Grid } from '@aoc/utils';

export function part1(input: string[]): number {
    const grid = Grid.fromStrings(input);
    return grid.countWordOccurrences('XMAS');
}

export function part2(input: string[]): number {
    // Placeholder for part 2 - implement the actual logic
    return 0;
}

export function dayFour(reader: readline.Interface) {
    const input: string[] = [];

    reader
        .on('line', (line: string) => {
            input.push(line);
        })
        .on('close', () => {
            console.log(`Day Four Part One: ${part1(input)}`);
            console.log(`Day Four Part Two: ${part2(input)}`);
        });
}