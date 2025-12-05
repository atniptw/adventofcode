function parseInput(input: string[]): { ranges: Array<[number, number]>; ids: number[] } {
    const ranges: Array<[number, number]> = [];
    const ids: number[] = [];
    
    for (const line of input) {
        if (line.includes('-')) {
            const [start, end] = line.split('-').map(Number);
            if (start !== undefined && end !== undefined) {
                ranges.push([start, end]);
            }
        } else if (line !== '') {
            ids.push(Number(line));
        }
    }
    
    return { ranges, ids };
}

function isInRanges(id: number, ranges: Array<[number, number]>): boolean {
    return ranges.some(([start, end]) => id >= start && id <= end);
}

function mergeRanges(ranges: Array<[number, number]>): Array<[number, number]> {
    if (ranges.length === 0) return [];
    
    // Sort ranges by start value
    const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
    const merged: Array<[number, number]> = [sorted[0]!];
    
    for (let i = 1; i < sorted.length; i++) {
        const [start, end] = sorted[i]!;
        const last = merged[merged.length - 1]!;
        
        if (start <= last[1]) {
            // Overlapping ranges, merge them
            last[1] = Math.max(last[1], end);
        } else {
            // No overlap, add new range
            merged.push([start, end]);
        }
    }
    
    return merged;
}

function countLengthOfRanges(ranges: Array<[number, number]>): number {
    return ranges.reduce((total, [start, end]) => total + (end - start + 1), 0);
}

export function part1(input: string[]): number {
    const { ranges, ids } = parseInput(input);
    return ids.filter(id => isInRanges(id, ranges)).length;
}

export function part2(input: string[]): number {
    const { ranges } = parseInput(input);
    const mergedRanges = mergeRanges(ranges);
    return countLengthOfRanges(mergedRanges);
}