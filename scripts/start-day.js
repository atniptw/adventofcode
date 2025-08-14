#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

console.log(`🎄 Starting Advent of Code ${year} Day ${day}...`);

// Step 1: Setup day files
console.log('\n📁 Setting up day files...');
const setupArgs = ['scripts/setup-day.js', year, day.toString()];
const setupChild = spawn('node', setupArgs, {
    stdio: 'inherit'
});

setupChild.on('close', (setupCode) => {
    if (setupCode !== 0) {
        console.error('❌ Failed to setup day files');
        process.exit(1);
    }
    
    // Step 2: Fetch input
    console.log('\n🌐 Fetching puzzle input...');
    const fetchArgs = ['scripts/fetch-input.js', year, day.toString()];
    if (session) {
        fetchArgs.push(session);
    }
    
    const fetchChild = spawn('node', fetchArgs, {
        stdio: 'inherit'
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
        console.log(`  📝 Edit: src/${year}/day-${day.toString().padStart(2, '0')}.ts`);
        console.log(`  🧪 Test: npm test -- day-${day.toString().padStart(2, '0')}`);
        console.log(`  🚀 Run:  npm run solve ${year} ${day}`);
    });
    
    fetchChild.on('error', (error) => {
        console.error('❌ Error fetching input:', error.message);
        process.exit(1);
    });
});

setupChild.on('error', (error) => {
    console.error('❌ Error setting up day files:', error.message);
    process.exit(1);
});