#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length !== 1) {
    console.log('Usage: node setup-year.js <year>');
    console.log('Example: node setup-year.js 2025');
    process.exit(1);
}

const year = args[0];
const yearPath = path.join(__dirname, '..', 'years', year);
const templatePath = path.join(__dirname, '..', 'template');

// Check if year directory already exists
if (fs.existsSync(yearPath)) {
    console.error(`Year ${year} directory already exists`);
    process.exit(1);
}

// Check if template directory exists
if (!fs.existsSync(templatePath)) {
    console.error('Template directory not found');
    process.exit(1);
}

function copyDirectory(src, dest) {
    fs.mkdirSync(dest, { recursive: true });
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

try {
    console.log(`Setting up year ${year}...`);
    
    // Copy template directory to new year
    copyDirectory(templatePath, yearPath);
    
    // Update package.json with correct year
    const packageJsonPath = path.join(yearPath, 'package.json');
    let packageContent = fs.readFileSync(packageJsonPath, 'utf8');
    packageContent = packageContent.replace(/YEAR/g, year);
    fs.writeFileSync(packageJsonPath, packageContent);
    
    // Create 25 day files (01-25)
    for (let day = 1; day <= 25; day++) {
        const dayPadded = day.toString().padStart(2, '0');
        
        // Copy and rename day template
        const templateDayFile = path.join(yearPath, 'src', 'day-XX.ts');
        const dayFile = path.join(yearPath, 'src', `day-${dayPadded}.ts`);
        
        if (fs.existsSync(templateDayFile)) {
            let content = fs.readFileSync(templateDayFile, 'utf8');
            content = content.replace(/XX/g, dayPadded);
            fs.writeFileSync(dayFile, content);
        }
        
        // Copy and rename test template
        const templateTestFile = path.join(yearPath, 'test', 'day-XX.spec.ts');
        const testFile = path.join(yearPath, 'test', `day-${dayPadded}.spec.ts`);
        
        if (fs.existsSync(templateTestFile)) {
            let content = fs.readFileSync(templateTestFile, 'utf8');
            content = content.replace(/XX/g, dayPadded);
            fs.writeFileSync(testFile, content);
        }
        
        // Create empty input file
        const inputFile = path.join(yearPath, 'src', 'inputs', `day-${dayPadded}.txt`);
        fs.writeFileSync(inputFile, '');
    }
    
    // Remove template files
    fs.unlinkSync(path.join(yearPath, 'src', 'day-XX.ts'));
    fs.unlinkSync(path.join(yearPath, 'test', 'day-XX.spec.ts'));
    
    console.log(`Year ${year} setup completed!`);
    console.log(`\\nTo get started:`);
    console.log(`  cd years/${year}`);
    console.log(`  npm install`);
    console.log(`\\nTo run a solution from the root:`);
    console.log(`  npm run solve ${year} 1     # Run day 1 both parts`);
    console.log(`  npm run solve ${year} 1 1   # Run day 1 part 1 only`);
    console.log(`  npm run solve ${year} 1 2   # Run day 1 part 2 only`);
    
} catch (error) {
    console.error('Error setting up year:', error.message);
    
    // Clean up partial setup
    if (fs.existsSync(yearPath)) {
        fs.rmSync(yearPath, { recursive: true, force: true });
    }
    
    process.exit(1);
}