#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const filterYear = args[0];

if (args.includes('--help') || args.includes('-h')) {
  console.log('Usage: npm run list-days [year]');
  console.log('');
  console.log('Shows all implemented days with their status');
  console.log('');
  console.log('Examples:');
  console.log('  npm run list-days        # All years');
  console.log('  npm run list-days 2024   # Only 2024');
  process.exit(0);
}

const yearPath = path.join(__dirname, '..', 'src');

// Get years to check
let years = [];
if (filterYear) {
  if (fs.existsSync(path.join(yearPath, filterYear))) {
    years = [filterYear];
  } else {
    console.error(`❌ Year ${filterYear} not found`);
    console.log(`   Available years: ${getAvailableYears().join(', ') || 'none'}`);
    console.log(`   Start with: npm run start-day ${filterYear} 1`);
    process.exit(1);
  }
} else {
  years = getAvailableYears();
}

if (years.length === 0) {
  console.log('📂 No days found. Start with: npm run start-day <year> <day>');
  process.exit(0);
}

function getAvailableYears() {
  return fs.existsSync(yearPath)
    ? fs
        .readdirSync(yearPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory() && /^\d{4}$/.test(dirent.name))
        .map((dirent) => dirent.name)
        .sort()
    : [];
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatSize(bytes) {
  if (bytes === 0) return '0B';
  if (bytes < 1024) return `${bytes}B`;
  return `${Math.round(bytes / 1024)}KB`;
}

// Display days for each year
for (const year of years) {
  console.log(`\n📅 Year ${year}:`);

  const yearPath = path.join(yearPath, year);
  const inputsPath = path.join(yearPath, 'inputs');

  // Get all solution files
  const solutionFiles = fs.existsSync(yearPath)
    ? fs
        .readdirSync(yearPath)
        .filter((file) => file.match(/^day-\d{2}\.ts$/))
        .sort()
    : [];

  if (solutionFiles.length === 0) {
    console.log('   No days implemented yet');
    console.log(`   Start with: npm run start-day ${year} 1`);
    continue;
  }

  console.log('   Day | Solution | Test | Input  | Status');
  console.log('   ----|----------|------|--------|--------');

  for (const file of solutionFiles) {
    const dayMatch = file.match(/day-(\d{2})\.ts$/);
    if (!dayMatch) continue;

    const day = dayMatch[1];
    const dayNum = parseInt(day);

    const solutionFile = path.join(yearPath, file);
    const testFile = path.join(yearPath, `day-${day}.spec.ts`);
    const inputFile = path.join(inputsPath, `day-${day}.txt`);

    const solutionSize = getFileSize(solutionFile);
    const hasTest = fs.existsSync(testFile);
    const inputSize = getFileSize(inputFile);
    const hasInput = inputSize > 0;

    // Check if solution is implemented (more than just template)
    const isImplemented = solutionSize > 1000; // Rough heuristic for implemented vs template

    const solutionStatus = isImplemented ? '✅' : '📝';
    const testStatus = hasTest ? '✅' : '❌';
    const inputStatus = hasInput ? `✅ ${formatSize(inputSize)}` : '❌';

    let status = '';
    if (isImplemented && hasTest && hasInput) {
      status = '🚀 Ready';
    } else if (!hasInput) {
      status = '⚠️  No input';
    } else if (!isImplemented) {
      status = '📝 Template';
    } else {
      status = '🔧 In progress';
    }

    console.log(
      `   ${dayNum.toString().padStart(3)} | ${solutionStatus.padEnd(8)} | ${testStatus.padEnd(4)} | ${inputStatus.padEnd(6)} | ${status}`
    );
  }

  // Show quick actions for this year
  const lastDay = Math.max(...solutionFiles.map((f) => parseInt(f.match(/day-(\d{2})\.ts$/)[1])));
  const nextDay = lastDay + 1;

  if (nextDay <= 25) {
    console.log(`\n   💡 Next: npm run start-day ${year} ${nextDay}`);
  }
}

console.log('\n🔧 Actions:');
console.log('   Fetch missing input:  npm run fetch-input <year> <day>');
console.log('   Run solution:         npm run solve <year> <day>');
console.log('   Run tests:            npm test -- day-<DD>');
console.log('   Check specific day:   npm run check-day <year> <day>');
