#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import readline from 'readline';
import { spawnSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';
import { resolveSession, resolveUserAgent } from './lib/aoc-session.js';
import { extractArticles, articleToText } from './lib/aoc-html.js';
import { loadState, saveState, stateFilePath } from './lib/aoc-state.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Usage: npm run submit <year> <day> <part> [answer]');
  console.error('');
  console.error('part must be 1 or 2.');
  console.error("If [answer] is omitted, the day's built solution is run against its input");
  console.error('file to compute the answer; you will be asked to confirm before it is sent.');
  process.exit(1);
}

const year = args[0];
const day = parseInt(args[1]);
const part = args[2];
const explicitAnswer = args[3];

if (isNaN(day) || day < 1 || day > 25) {
  console.error('Error: Day must be between 1 and 25');
  process.exit(1);
}
if (part !== '1' && part !== '2') {
  console.error('Error: part must be 1 or 2');
  process.exit(1);
}

const dayPadded = String(day).padStart(2, '0');
const yearDir = path.join(projectRoot, 'src', year);
if (!fs.existsSync(yearDir)) {
  console.error(`Error: Year directory not found: ${yearDir}`);
  process.exit(1);
}

const session = resolveSession(undefined, __dirname);
const userAgent = resolveUserAgent(__dirname);

const stateFile = stateFilePath(yearDir, dayPadded);
const partKey = `part${part}`;
const state = loadState(stateFile);

if (state[partKey].solved) {
  console.log(`✓ Part ${part} already solved. Answer: ${state[partKey].answer}`);
  process.exit(0);
}

function readInputLines(inputFile) {
  return new Promise((resolve, reject) => {
    const lines = [];
    const rl = readline.createInterface({
      input: fs.createReadStream(inputFile),
      crlfDelay: Infinity,
    });
    rl.on('line', (line) => lines.push(line));
    rl.on('close', () => resolve(lines));
    rl.on('error', reject);
  });
}

function confirm(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === 'y');
    });
  });
}

function postAnswer(value) {
  return new Promise((resolve, reject) => {
    const body = `level=${part}&answer=${encodeURIComponent(value)}`;
    const req = https.request(
      {
        hostname: 'adventofcode.com',
        path: `/${year}/day/${day}/answer`,
        method: 'POST',
        headers: {
          Cookie: `session=${session}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function computeAnswer() {
  console.log('Building...');
  const build = spawnSync('npm', ['run', 'build'], { stdio: 'inherit', cwd: projectRoot });
  if (build.status !== 0) {
    console.error('❌ Build failed');
    process.exit(1);
  }

  const builtFile = path.join(projectRoot, 'build', year, `day-${dayPadded}.js`);
  if (!fs.existsSync(builtFile)) {
    console.error(`Error: Built solution not found: ${builtFile}`);
    process.exit(1);
  }

  const inputFile = path.join(yearDir, 'inputs', `day-${dayPadded}.txt`);
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file not found: ${inputFile}`);
    console.error(`Download it with: npm run fetch-input ${year} ${day}`);
    process.exit(1);
  }

  const [input, mod] = await Promise.all([
    readInputLines(inputFile),
    import(pathToFileURL(builtFile).href),
  ]);

  const fn = part === '1' ? mod.part1 : mod.part2;
  if (typeof fn !== 'function') {
    console.error(`Error: part${part} is not exported from ${builtFile}`);
    process.exit(1);
  }

  return String(fn(input));
}

async function main() {
  const value = explicitAnswer !== undefined ? explicitAnswer : await computeAnswer();
  console.log(`Computed answer: ${value}`);

  const knownWrong = state[partKey].wrongGuesses.find((guess) => guess.value === value);
  if (knownWrong) {
    const hintSuffix = knownWrong.hint ? ` (too ${knownWrong.hint})` : '';
    console.log(
      `⚠️  "${value}" was already tried and marked wrong${hintSuffix}. Not resubmitting.`
    );
    process.exit(0);
  }

  const proceed = await confirm(`Submit "${value}" for ${year} day ${day} part ${part}? (y/N): `);
  if (!proceed) {
    console.log('Aborted.');
    process.exit(0);
  }

  console.log('Submitting...');
  const response = await postAnswer(value);
  if (response.statusCode !== 200) {
    console.error(`Error: HTTP ${response.statusCode}`);
    process.exit(1);
  }

  const [article] = extractArticles(response.body);
  const message = article ? articleToText(article) : response.body;

  if (message.includes("That's the right answer")) {
    state[partKey].solved = true;
    state[partKey].answer = value;
    saveState(stateFile, state);
    console.log(`🎉 Correct! ${message}`);
    if (part === '1') {
      console.log(`Run 'npm run get-problem ${year} ${day}' to fetch part 2's text.`);
    }
  } else if (message.includes('not the right answer')) {
    const hint = message.includes('too high') ? 'high' : message.includes('too low') ? 'low' : null;
    state[partKey].wrongGuesses.push({ value, hint });
    saveState(stateFile, state);
    console.log(`❌ Wrong${hint ? ` (too ${hint})` : ''}: ${message}`);
  } else if (message.includes('You gave an answer too recently')) {
    console.log(`⏳ ${message}`);
  } else if (message.includes('solving the right level') || message.includes('already complete')) {
    console.log(`ℹ️  ${message}`);
  } else {
    console.log(message);
  }
}

main().catch((error) => {
  console.error('Error:', error instanceof Error ? error.message : String(error));
  process.exit(1);
});
