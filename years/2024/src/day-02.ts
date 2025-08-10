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

