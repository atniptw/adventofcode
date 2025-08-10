import { joinLines } from '@aoc/utils';

function extractNumbers(mulInstruction: string): number {
    const match = mulInstruction.match(/(\d+),(\d+)/);
    return match ? parseInt(match[1]) * parseInt(match[2]) : 0;
}

function findInstructions(text: string, pattern: RegExp): string[] {
    const instructions: string[] = [];
    let match;
    while ((match = pattern.exec(text)) !== null) {
        instructions.push(match[0]);
    }
    return instructions;
}

export function part1(input: string[]): number {
    const text = joinLines(input);
    const mulInstructions = findInstructions(text, /mul\(\d+,\d+\)/g);
    return mulInstructions.reduce((sum, instruction) => sum + extractNumbers(instruction), 0);
}

export function part2(input: string[]): number {
    const text = joinLines(input);
    const instructions = findInstructions(text, /mul\(\d+,\d+\)|don't\(\)|do\(\)/g);
    
    let enabled = true;
    return instructions.reduce((sum, instruction) => {
        switch (instruction) {
            case "don't()":
                enabled = false;
                return sum;
            case "do()":
                enabled = true;
                return sum;
            default:
                return enabled ? sum + extractNumbers(instruction) : sum;
        }
    }, 0);
}

