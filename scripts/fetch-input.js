#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Usage: npm run fetch-input <year> <day> [session]');
    console.error('');
    console.error('Session token can be provided as:');
    console.error('  - Third argument');
    console.error('  - AOC_SESSION environment variable');
    console.error('  - .env file with AOC_SESSION=<token>');
    console.error('');
    console.error('To get your session token:');
    console.error('  1. Log in to adventofcode.com');
    console.error('  2. Open DevTools (F12)');
    console.error('  3. Go to Application/Storage > Cookies');
    console.error('  4. Copy the value of the "session" cookie');
    process.exit(1);
}

const year = args[0];
const day = parseInt(args[1]);
let session = args[2] || process.env.AOC_SESSION;

// Try to load from .env file if not provided
if (!session) {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/AOC_SESSION=(.+)/);
        if (match) {
            session = match[1].trim();
        }
    }
}

if (!session) {
    console.error('Error: Session token not provided.');
    console.error('Please provide it as an argument, environment variable, or in .env file');
    process.exit(1);
}

// Validate inputs
if (isNaN(day) || day < 1 || day > 25) {
    console.error('Error: Day must be between 1 and 25');
    process.exit(1);
}

// Check if year directory exists
const yearDir = path.join(__dirname, '..', 'src', year);
if (!fs.existsSync(yearDir)) {
    console.error(`Error: Year directory not found: ${yearDir}`);
    console.error(`Run 'npm run setup ${year}' first to create the year directory`);
    process.exit(1);
}

// Create inputs directory if it doesn't exist
const inputsDir = path.join(yearDir, 'inputs');
if (!fs.existsSync(inputsDir)) {
    fs.mkdirSync(inputsDir, { recursive: true });
    console.log(`Created inputs directory: ${inputsDir}`);
}

// Format day with zero padding
const dayPadded = String(day).padStart(2, '0');
const inputFile = path.join(inputsDir, `day-${dayPadded}.txt`);

// Check if file already exists
if (fs.existsSync(inputFile)) {
    console.log(`Input file already exists: ${inputFile}`);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question('Overwrite? (y/N): ', (answer) => {
        if (answer.toLowerCase() !== 'y') {
            console.log('Skipping download');
            process.exit(0);
        }
        rl.close();
        downloadInput();
    });
} else {
    downloadInput();
}

function downloadInput() {
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    console.log(`Fetching input from: ${url}`);

    const options = {
        headers: {
            'Cookie': `session=${session}`,
            'User-Agent': 'github.com/YOUR_USERNAME/adventofcode by YOUR_EMAIL'
        }
    };

    https.get(url, options, (response) => {
        if (response.statusCode === 404) {
            console.error(`Error: Day ${day} not yet available for year ${year}`);
            process.exit(1);
        } else if (response.statusCode === 400 || response.statusCode === 500) {
            console.error('Error: Invalid session token or server error');
            console.error('Make sure your session token is correct and not expired');
            process.exit(1);
        } else if (response.statusCode !== 200) {
            console.error(`Error: HTTP ${response.statusCode}`);
            process.exit(1);
        }

        let data = '';
        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            // Check if we got an error page (HTML)
            if (data.includes('<!DOCTYPE html>') || data.includes('<html>')) {
                console.error('Error: Received HTML instead of input data');
                console.error('This usually means:');
                console.error('  - Session token is invalid or expired');
                console.error('  - The puzzle is not yet available');
                console.error('  - You haven\'t unlocked this puzzle yet');
                process.exit(1);
            }

            // Remove trailing newline if present (AoC inputs usually have one)
            if (data.endsWith('\n')) {
                data = data.slice(0, -1);
            }

            // Write the input file
            fs.writeFileSync(inputFile, data);
            console.log(`✓ Input saved to: ${inputFile}`);
            console.log(`  Lines: ${data.split('\n').length}`);
            console.log(`  Size: ${data.length} bytes`);
            
            // Remind about running the solution
            console.log('');
            console.log(`You can now run: npm run solve ${year} ${day}`);
        });
    }).on('error', (err) => {
        console.error('Error fetching input:', err.message);
        process.exit(1);
    });
}