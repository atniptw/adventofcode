#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    console.log('Usage: npm run solve <year> <day> [part]');
    console.log('Example: npm run solve 2024 1');
    console.log('Example: npm run solve 2024 1 1');
    console.log('Example: npm run solve 2024 1 2');
    process.exit(1);
}

const year = args[0];
const day = args[1].padStart(2, '0'); // Pad with leading zero
const part = args[2] || 'both'; // Default to both parts

const yearPath = path.join(__dirname, '..', 'years', year);

// Check if year directory exists
if (!fs.existsSync(yearPath)) {
    console.error(`Year ${year} directory not found`);
    process.exit(1);
}

// Check if the year has a package.json
const yearPackageJson = path.join(yearPath, 'package.json');
if (!fs.existsSync(yearPackageJson)) {
    console.error(`No package.json found in ${year} directory`);
    process.exit(1);
}

// Build the solution file path
const solutionFile = path.join(yearPath, 'src', `day-${day}.ts`);

if (!fs.existsSync(solutionFile)) {
    console.error(`Solution file not found: ${solutionFile}`);
    process.exit(1);
}

// Create a temporary runner file for this specific execution
const tempRunnerContent = `
import fs from 'node:fs';
import readline from 'readline';

async function main() {
    try {
        const { part1, part2 } = await import('./src/day-${day}');
        
        const inputFile = './src/inputs/day-${day}.txt';
        if (!fs.existsSync(inputFile)) {
            console.error('Input file not found:', inputFile);
            process.exit(1);
        }

        const reader = readline.createInterface({
            input: fs.createReadStream(inputFile),
            crlfDelay: Infinity
        });

        const input: string[] = [];
        
        reader.on('line', (line: string) => {
            input.push(line);
        });
        
        reader.on('close', () => {
            console.log(\`=== Day ${parseInt(day)} ===\`);
            
            if ('${part}' === 'both' || '${part}' === '1') {
                if (part1) {
                    const start1 = Date.now();
                    const result1 = part1(input);
                    const time1 = Date.now() - start1;
                    console.log(\`Part 1: \${result1} (\${time1}ms)\`);
                } else {
                    console.log('Part 1: Not implemented');
                }
            }
            
            if ('${part}' === 'both' || '${part}' === '2') {
                if (part2) {
                    const start2 = Date.now();
                    const result2 = part2(input);
                    const time2 = Date.now() - start2;
                    console.log(\`Part 2: \${result2} (\${time2}ms)\`);
                } else {
                    console.log('Part 2: Not implemented');
                }
            }
        });
    } catch (error) {
        console.error('Error running solution:', error.message);
        process.exit(1);
    }
}

main();
`;

const tempRunnerPath = path.join(yearPath, 'temp-runner.ts');
fs.writeFileSync(tempRunnerPath, tempRunnerContent);

// Change to year directory and run with ts-node
process.chdir(yearPath);

const child = spawn('npx', ['ts-node', 'temp-runner.ts'], {
    stdio: 'inherit'
});

child.on('close', (code) => {
    // Clean up temp file
    fs.unlinkSync(tempRunnerPath);
    process.exit(code);
});

child.on('error', (error) => {
    console.error('Error running solution:', error.message);
    // Clean up temp file
    if (fs.existsSync(tempRunnerPath)) {
        fs.unlinkSync(tempRunnerPath);
    }
    process.exit(1);
});