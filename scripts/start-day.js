#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Template content (embedded to avoid external template files)
const SOLUTION_TEMPLATE = `// import { parseNumbers, parseNumberGrid, parseCharGrid, Grid, frequency, count, sum } from '../utils';

export function part1(_input: string[]): number {
    // Example patterns you can use:
    
    // For single numbers per line:
    // const numbers = parseNumbers(_input);
    
    // For space-separated numbers per line:
    // const grid = parseNumberGrid(_input);
    
    // For character grids:
    // const charGrid = Grid.fromStrings(_input);
    // const grid = parseCharGrid(_input);
    
    // TODO: Implement part 1
    return 0;
}

export function part2(_input: string[]): number {
    // TODO: Implement part 2
    return 0;
}`;

const TEST_TEMPLATE = `import { part1, part2 } from './day-DAY';

describe('Day DAY_NUM', () => {
    const testInput = [
        // Add test input here
    ];

    test('part1', () => {
        expect(part1(testInput)).toBe(0); // Update expected value
    });

    test('part2', () => {
        expect(part2(testInput)).toBe(0); // Update expected value
    });
});`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log('Usage: npm run start-day <year> <day> [session]');
  console.log('');
  console.log('This command will:');
  console.log('  1. Create solution and test files for the day');
  console.log('  2. Download the puzzle input from adventofcode.com');
  console.log('');
  console.log('Example: npm run start-day 2024 5');
  console.log('Example: npm run start-day 2024 5 <session-token>');
  process.exit(1);
}

const year = args[0];
const day = parseInt(args[1]);
const session = args[2];

if (isNaN(day) || day < 1 || day > 25) {
  console.error('Error: Day must be between 1 and 25');
  process.exit(1);
}

const dayPadded = String(day).padStart(2, '0');

console.log(`🎄 Starting Advent of Code ${year} Day ${day}...`);

// Step 1: Setup day files
console.log('\n📁 Setting up day files...');

const srcYearPath = path.join(__dirname, '..', 'src', year);
// Place tests next to solution files under src/<year>
const testYearPath = path.join(__dirname, '..', 'src', year);

// Create year directories if they don't exist (tests will colocate in src/year)
fs.mkdirSync(srcYearPath, { recursive: true });
fs.mkdirSync(testYearPath, { recursive: true });
fs.mkdirSync(path.join(srcYearPath, 'inputs'), { recursive: true });

// Create day solution file
const dayFile = path.join(srcYearPath, `day-${dayPadded}.ts`);
if (fs.existsSync(dayFile)) {
  console.log(`Day ${day} solution already exists: ${dayFile}`);
} else {
  fs.writeFileSync(dayFile, SOLUTION_TEMPLATE);
  console.log(`✓ Created solution file: ${dayFile}`);
}

// Create test file
const testFile = path.join(testYearPath, `day-${dayPadded}.spec.ts`);
if (fs.existsSync(testFile)) {
  console.log(`Day ${day} test already exists: ${testFile}`);
} else {
  let testContent = TEST_TEMPLATE.replace(/YEAR/g, year)
    .replace(/DAY_NUM/g, dayPadded)
    .replace(/DAY/g, dayPadded);
  fs.writeFileSync(testFile, testContent);
  console.log(`✓ Created test file: ${testFile}`);
}

// Create empty input file
const inputFile = path.join(srcYearPath, 'inputs', `day-${dayPadded}.txt`);
if (fs.existsSync(inputFile)) {
  console.log(`Day ${day} input already exists: ${inputFile}`);
} else {
  fs.writeFileSync(inputFile, '');
  console.log(`✓ Created input file: ${inputFile}`);
}

// Step 2: Fetch input
console.log('\n🌐 Fetching puzzle input...');
const fetchArgs = ['scripts/fetch-input.js', year, day.toString()];
if (session) {
  fetchArgs.push(session);
}

const fetchChild = spawn('node', fetchArgs, {
  stdio: 'inherit',
});

fetchChild.on('close', (fetchCode) => {
  if (fetchCode !== 0) {
    console.error('❌ Failed to fetch input (but day files are ready)');
    console.error('You can manually fetch input later with:');
    console.error(`  npm run fetch-input ${year} ${day}`);
    process.exit(1);
  }

  console.log('\n🎉 Ready to solve!');
  console.log('');
  console.log('Next steps:');
  console.log(`  📝 Edit: src/${year}/day-${dayPadded}.ts`);
  console.log(`  🧪 Test: npm test -- day-${dayPadded}`);
  console.log(`  🚀 Run:  npm run solve ${year} ${day}`);
});

fetchChild.on('error', (error) => {
  console.error('❌ Error fetching input:', error.message);
  process.exit(1);
});
