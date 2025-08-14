#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎄 Advent of Code Project Status\n');

// Get all years
const srcPath = path.join(__dirname, '..', 'src');
const years = fs.existsSync(srcPath) 
    ? fs.readdirSync(srcPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && /^\d{4}$/.test(dirent.name))
        .map(dirent => dirent.name)
        .sort()
    : [];

if (years.length === 0) {
    console.log('📂 No years found. Start with: npm run start-day <year> <day>');
    console.log('\nExample: npm run start-day 2024 1');
    process.exit(0);
}

console.log('📊 Project Overview:');
console.log(`   Years: ${years.join(', ')}`);

// Check if .env exists for session token
const envPath = path.join(__dirname, '..', '.env');
const hasEnv = fs.existsSync(envPath);
console.log(`   Session: ${hasEnv ? '✅ Configured' : '❌ Missing (.env file)'}`);

// Check each year
for (const year of years) {
    console.log(`\n📅 Year ${year}:`);
    
    const yearSrcPath = path.join(srcPath, year);
    const yearTestPath = path.join(__dirname, '..', 'test', year);
    const inputsPath = path.join(yearSrcPath, 'inputs');
    
    // Get all solution files
    const solutionFiles = fs.existsSync(yearSrcPath)
        ? fs.readdirSync(yearSrcPath)
            .filter(file => file.match(/^day-\d{2}\.ts$/))
            .sort()
        : [];
    
    if (solutionFiles.length === 0) {
        console.log('   📝 No days implemented');
        continue;
    }
    
    console.log(`   📝 Days implemented: ${solutionFiles.length}`);
    
    // Check status of each day
    let readyDays = 0;
    let missingInputs = [];
    
    for (const file of solutionFiles) {
        const dayMatch = file.match(/day-(\d{2})\.ts$/);
        if (!dayMatch) continue;
        
        const day = dayMatch[1];
        const testFile = path.join(yearTestPath, `day-${day}.spec.ts`);
        const inputFile = path.join(inputsPath, `day-${day}.txt`);
        
        const hasTest = fs.existsSync(testFile);
        const hasInput = fs.existsSync(inputFile) && fs.readFileSync(inputFile, 'utf8').trim().length > 0;
        
        if (hasTest && hasInput) {
            readyDays++;
        } else if (!hasInput) {
            missingInputs.push(day);
        }
    }
    
    console.log(`   ✅ Ready to solve: ${readyDays} days`);
    
    if (missingInputs.length > 0) {
        console.log(`   ⚠️  Missing inputs: day ${missingInputs.join(', day ')}`);
        console.log(`      Fix with: npm run fetch-input ${year} <day>`);
    }
}

console.log('\n🚀 Common Commands:');
console.log('   Start new day:     npm run start-day <year> <day>');
console.log('   Run solution:      npm run solve <year> <day>');
console.log('   Run tests:         npm test -- day-<DD>');
console.log('   List days:         npm run list-days [year]');
console.log('   Check specific:    npm run check-day <year> <day>');

console.log('\n📖 More help:');
console.log('   Project help:      npm run help');
console.log('   Documentation:     cat CLAUDE.md');

if (!hasEnv) {
    console.log('\n⚠️  Setup needed:');
    console.log('   1. Create .env file with AOC_SESSION=<your-session-token>');
    console.log('   2. Get token from adventofcode.com cookies');
    console.log('   3. See CLAUDE.md for detailed instructions');
}