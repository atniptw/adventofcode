import { parseNumberGrid, isSorted, removeAt, count } from '@aoc/utils';

function isSafe(report: number[]): boolean {
    return isSorted(report, 3);
}

function isSafeWithDampener(report: number[]): boolean {
    if (isSafe(report)) return true;
    
    return report.some((_, i) => isSafe(removeAt(report, i)));
}

export function part1(input: string[]): number {
    const reports = parseNumberGrid(input);
    return count(reports, isSafe);
}

export function part2(input: string[]): number {
    const reports = parseNumberGrid(input);
    return count(reports, isSafeWithDampener);
}

export function dayTwo(reader: readline.Interface) {
    const reports: number[][] = [];

    reader.on('line', (line) => {
      const reportRaw = line.split(' ');
      reports.push(reportRaw.map(i => parseInt(i)));
    })
      .on('close', () => {
        console.log(`Day Two Part One: ${reports.filter(report => part1(report)).length}`);
        console.log(`Day Two Part Two: ${reports.filter(report => part2(report)).length}`);
      });  
}
