#!/usr/bin/env node

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 2 || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: npm run solve <year> <day> [part]');
  console.log('');
  console.log('Runs the solution for a specific Advent of Code day');
  console.log('');
  console.log('Arguments:');
  console.log('  year    Year (e.g., 2024)');
  console.log('  day     Day number (1-25)');
  console.log('  part    Optional: 1 or 2 (default: both)');
  console.log('');
  console.log('Examples:');
  console.log('  npm run solve 2024 1      # Run both parts');
  console.log('  npm run solve 2024 1 1    # Run part 1 only');
  console.log('  npm run solve 2024 1 2    # Run part 2 only');
  console.log('');
  console.log("💡 Don't have a day setup? Run: npm run start-day <year> <day>");
  process.exit(args.includes('--help') || args.includes('-h') ? 0 : 1);
}

const year = args[0];
const day = args[1].padStart(2, '0'); // Pad with leading zero
const part = args[2] || 'both'; // Default to both parts

const srcPath = path.join(__dirname, '..', 'src', year);

// Check if year directory exists
if (!fs.existsSync(srcPath)) {
  console.error(`❌ Year ${year} directory not found`);
  console.log(`💡 Create it with: npm run start-day ${year} 1`);
  console.log(`📊 See status: npm run aoc-status`);
  process.exit(1);
}

// Build the solution file path
const solutionFile = path.join(srcPath, `day-${day}.ts`);

if (!fs.existsSync(solutionFile)) {
  console.error(`❌ Solution file not found: ${solutionFile}`);
  console.log(`💡 Create it with: npm run start-day ${year} ${parseInt(day)}`);
  console.log(`📋 Check day status: npm run check-day ${year} ${parseInt(day)}`);
  process.exit(1);
}

// Change to project root
const projectRoot = path.join(__dirname, '..');
process.chdir(projectRoot);

// Build first to ensure we have JS files
const buildChild = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
});

buildChild.on('close', (buildCode) => {
  if (buildCode !== 0) {
    console.error('❌ Build failed');
    console.log('💡 Check TypeScript errors above');
    console.log('🔧 Try: npm run typecheck');
    process.exit(1);
  }

  // Create a temporary runner file for this specific execution
  const tempRunnerContent = `
import fs from 'node:fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    try {
        const module = await import('./build/${year}/day-${day}.js');
        const { part1, part2 } = module;
        
        const inputFile = './src/${year}/inputs/day-${day}.txt';
        if (!fs.existsSync(inputFile)) {
            console.error('❌ Input file not found:', inputFile);
            console.log(\`💡 Download it with: npm run fetch-input ${year} ${parseInt(day)}\`);
            console.log(\`📋 Check day status: npm run check-day ${year} ${parseInt(day)}\`);
            process.exit(1);
        }

        const reader = readline.createInterface({
            input: fs.createReadStream(inputFile),
            crlfDelay: Infinity
        });

        const input = [];
        
        reader.on('line', (line) => {
            input.push(line);
        });
        
        reader.on('close', () => {
            console.log(\`=== Day ${parseInt(day)} ===\`);
            
            const requestedPart = '${part}';
            
            if (requestedPart === 'both' || requestedPart === '1') {
                if (part1) {
                    const start1 = Date.now();
                    const result1 = part1(input);
                    const time1 = Date.now() - start1;
                    console.log(\`Part 1: \${result1} (\${time1}ms)\`);
                } else {
                    console.log('Part 1: Not implemented');
                }
            }
            
            if (requestedPart === 'both' || requestedPart === '2') {
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
        console.error('Error running solution:', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

main();
`;

  const tempRunnerPath = path.join(projectRoot, 'temp-runner.mjs');
  fs.writeFileSync(tempRunnerPath, tempRunnerContent);

  const child = spawn('node', ['temp-runner.mjs'], {
    stdio: 'inherit',
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
});
