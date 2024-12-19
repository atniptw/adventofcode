import readline from 'readline';

function isDescending(a: number[]): boolean {
    return a.every((currentValue, index) => {
        return index === 0 || (currentValue < a[index - 1] && Math.abs(currentValue - a[index - 1]) < 4);
    });
}

function isAscending(a:number[]): boolean {
    return a.every((currentValue, index) => {
        return index === 0 || (currentValue > a[index - 1] && Math.abs(currentValue - a[index - 1]) < 4);
    });
}

export function part1(a: number[]): boolean {
    return isDescending(a) || isAscending(a);
}

export function part2(a: number[]): boolean {
    return part1(a) || a.some((v, i, arr) => {
        const clone = [...arr];
        clone.splice(i,1);
        return part1(clone);
    });
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
