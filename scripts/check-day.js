#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.length < 2 || args.includes('--help') || args.includes('-h')) {
  console.log('Usage: npm run check-day <year> <day>');
  console.log('');
  console.log('Validates that a specific day is ready to solve');
  console.log('');
  console.log('Examples:');
  console.log('  npm run check-day 2024 5');
  console.log('  npm run check-day 2023 12');
  process.exit(args.includes('--help') || args.includes('-h') ? 0 : 1);
}

const year = args[0];
const day = parseInt(args[1]);

if (isNaN(day) || day < 1 || day > 25) {
  console.error('❌ Day must be between 1 and 25');
  process.exit(1);
}

const dayPadded = String(day).padStart(2, '0');

console.log(`🔍 Checking ${year} Day ${day}...\n`);

// File paths
const yearPath = path.join(__dirname, '..', 'src', year);
const solutionFile = path.join(yearPath, `day-${dayPadded}.ts`);
const testFile = path.join(yearPath, `day-${dayPadded}.spec.ts`);
const inputFile = path.join(yearPath, 'inputs', `day-${dayPadded}.txt`);

let allGood = true;
const issues = [];
const suggestions = [];

// Check solution file
console.log('📝 Solution file:');
if (fs.existsSync(solutionFile)) {
  const content = fs.readFileSync(solutionFile, 'utf8');
  const size = fs.statSync(solutionFile).size;

  console.log(`   ✅ Exists: ${solutionFile}`);
  console.log(`   📏 Size: ${Math.round(size / 1024)}KB`);

  // Check if it's been implemented (not just template)
  const hasImplementation = !content.includes('// TODO: Implement part 1') || size > 1000;
  if (hasImplementation) {
    console.log('   🚀 Appears to be implemented');
  } else {
    console.log('   📝 Still contains template code');
    suggestions.push(`Edit ${solutionFile} to implement your solution`);
  }

  // Check exports
  const hasPart1 = content.includes('export function part1');
  const hasPart2 = content.includes('export function part2');
  console.log(`   📤 Exports: part1=${hasPart1 ? '✅' : '❌'}, part2=${hasPart2 ? '✅' : '❌'}`);

  if (!hasPart1 || !hasPart2) {
    issues.push('Missing required exports (part1 and/or part2)');
    allGood = false;
  }
} else {
  console.log(`   ❌ Missing: ${solutionFile}`);
  issues.push('Solution file does not exist');
  suggestions.push(`Run: npm run start-day ${year} ${day}`);
  allGood = false;
}

// Check test file
console.log('\n🧪 Test file:');
if (fs.existsSync(testFile)) {
  const content = fs.readFileSync(testFile, 'utf8');
  console.log(`   ✅ Exists: ${testFile}`);

  // Check if tests are implemented
  const hasTestCases = !content.includes('// Add test input here') && content.includes('expect(');
  console.log(`   🎯 Has test cases: ${hasTestCases ? '✅' : '📝 Template only'}`);

  if (!hasTestCases) {
    suggestions.push(`Add test cases to ${testFile}`);
  }
} else {
  console.log(`   ❌ Missing: ${testFile}`);
  issues.push('Test file does not exist');
  suggestions.push(`Run: npm run start-day ${year} ${day}`);
  allGood = false;
}

// Check input file
console.log('\n📄 Input file:');
if (fs.existsSync(inputFile)) {
  const content = fs.readFileSync(inputFile, 'utf8').trim();
  const size = fs.statSync(inputFile).size;

  console.log(`   ✅ Exists: ${inputFile}`);
  console.log(`   📏 Size: ${Math.round(size / 1024)}KB`);

  if (content.length === 0) {
    console.log('   ⚠️  File is empty');
    issues.push('Input file is empty');
    suggestions.push(`Run: npm run fetch-input ${year} ${day}`);
    allGood = false;
  } else {
    const lines = content.split('\n').length;
    console.log(`   📊 Lines: ${lines}`);
    console.log('   ✅ Has content');
  }
} else {
  console.log(`   ❌ Missing: ${inputFile}`);
  issues.push('Input file does not exist');
  suggestions.push(`Run: npm run fetch-input ${year} ${day}`);
  allGood = false;
}

// Check TypeScript compilation
console.log('\n🔧 Build status:');
try {
  const buildPath = path.join(__dirname, '..', 'build', year, `day-${dayPadded}.js`);
  if (fs.existsSync(buildPath)) {
    console.log('   ✅ TypeScript compiled successfully');
  } else {
    console.log('   ⚠️  Not compiled yet');
    suggestions.push('Run: npm run build');
  }
} catch {
  console.log('   ❌ Build check failed');
  suggestions.push('Run: npm run build');
}

// Summary
console.log('\n📋 Summary:');
if (allGood) {
  console.log('   🎉 Everything looks good!');
  console.log('\n🚀 Ready to solve:');
  console.log(`   npm run solve ${year} ${day}     # Run solution`);
  console.log(`   npm test -- day-${dayPadded}      # Run tests`);
} else {
  console.log(`   ❌ ${issues.length} issue(s) found:`);
  issues.forEach((issue) => console.log(`      • ${issue}`));
}

if (suggestions.length > 0) {
  console.log('\n💡 Suggestions:');
  suggestions.forEach((suggestion) => console.log(`   ${suggestion}`));
}

process.exit(allGood ? 0 : 1);
