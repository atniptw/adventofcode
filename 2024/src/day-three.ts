import readline from 'readline';

function mullItOver(input: string): number {
    const regex = new RegExp(/(\d+),(\d+)/g);
    let match;
    if ((match = regex.exec(input)) !== null) {
        return parseInt(match[1]) * parseInt(match[2]);
    }
    return 0;
}

export function part1(input: string): number {
    const regex = /mul\(\d+,\d+\)/g;
    let matches;
    let agg = 0;
    while ((matches = regex.exec(input)) !== null) {
        agg += mullItOver(matches[0]);
    }
    return agg;
}

export function part2(input: string): number {
    const regex = /mul\(\d+,\d+\)|don't\(\)|do\(\)/g;
    const instructions: string[] = [];

    let matches;
    while ((matches = regex.exec(input)) !== null) {
        instructions.push(matches[0]);
    }

    let enabled = true;
    let agg = 0;
    instructions.forEach(instruction => {
        switch (instruction) {
            case "don't()":
                enabled = false;
                break;
            case "do()":
                enabled = true;
                break;
            default:
                if (enabled) agg += mullItOver(instruction);
                break;
        }
    });

    return agg;
}

export function dayThree(reader: readline.Interface) {
    let input = '';

    reader
        .on('line', (line: string) => {
            input = input.concat(line);
        })
        .on('close', () => {
            console.log(`Day Three Part One: ${part1(input)}`);
            console.log(`Day Three Part Two: ${part2(input)}`);
        });
}