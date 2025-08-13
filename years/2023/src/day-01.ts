import { sum } from '@aoc/utils';

export function part1(input: string[]): number {
    const calibrationValues = input.map(line => {
        // Find all digits in the line
        const digits = line.split('').filter(char => /\d/.test(char));
        
        if (digits.length === 0) return 0;
        
        // Combine first and last digit to form a two-digit number
        const firstDigit = digits[0]!;
        const lastDigit = digits[digits.length - 1]!;
        
        return parseInt(firstDigit + lastDigit);
    });
    
    return sum(calibrationValues);
}

export function part2(input: string[]): number {
    const digitWords = {
        'one': '1',
        'two': '2', 
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9'
    };
    
    const calibrationValues = input.map(line => {
        const digits: string[] = [];
        
        // Check each position in the string
        for (let i = 0; i < line.length; i++) {
            // Check if it's a numeric digit
            if (/\d/.test(line[i]!)) {
                digits.push(line[i]!);
            } else {
                // Check if a word digit starts at this position
                for (const [word, digit] of Object.entries(digitWords)) {
                    if (line.slice(i).startsWith(word)) {
                        digits.push(digit);
                        break; // Only match the first word at this position
                    }
                }
            }
        }
        
        if (digits.length === 0) return 0;
        
        // Combine first and last digit to form a two-digit number
        const firstDigit = digits[0]!;
        const lastDigit = digits[digits.length - 1]!;
        
        return parseInt(firstDigit + lastDigit);
    });
    
    return sum(calibrationValues);
}