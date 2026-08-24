#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { resolveSession, resolveUserAgent } from './lib/aoc-session.js';
import { extractArticles, articleToText } from './lib/aoc-html.js';
import { loadState, saveState, stateFilePath } from './lib/aoc-state.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: npm run get-problem <year> <day> [session]');
  console.error('');
  console.error("Fetches the puzzle prompt text and saves it next to the day's solution.");
  console.error('Session token can be provided as:');
  console.error('  - Third argument');
  console.error('  - AOC_SESSION environment variable');
  console.error('  - .env file with AOC_SESSION=<token>');
  process.exit(1);
}

const year = args[0];
const day = parseInt(args[1]);

if (isNaN(day) || day < 1 || day > 25) {
  console.error('Error: Day must be between 1 and 25');
  process.exit(1);
}

const yearDir = path.join(__dirname, '..', 'src', year);
if (!fs.existsSync(yearDir)) {
  console.error(`Error: Year directory not found: ${yearDir}`);
  console.error(`Run 'npm run start-day ${year} ${day}' first to create it`);
  process.exit(1);
}

const session = resolveSession(args[2], __dirname);
const userAgent = resolveUserAgent(__dirname);

const dayPadded = String(day).padStart(2, '0');
const problemsDir = path.join(yearDir, 'problems');
const problemFile = path.join(problemsDir, `day-${dayPadded}.md`);
const stateFile = stateFilePath(yearDir, dayPadded);

const url = `https://adventofcode.com/${year}/day/${day}`;
console.log(`Fetching problem text from: ${url}`);

const options = {
  headers: {
    Cookie: `session=${session}`,
    'User-Agent': userAgent,
  },
};

https
  .get(url, options, (response) => {
    if (response.statusCode === 404) {
      console.error(`Error: Day ${day} not yet available for year ${year}`);
      process.exit(1);
    } else if (response.statusCode === 400 || response.statusCode === 500) {
      console.error('Error: Invalid session token or server error');
      process.exit(1);
    } else if (response.statusCode !== 200) {
      console.error(`Error: HTTP ${response.statusCode}`);
      process.exit(1);
    }

    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const articles = extractArticles(data);
      if (articles.length === 0) {
        console.error('Error: Could not find puzzle text in the response.');
        console.error('This usually means the session token is invalid or expired.');
        process.exit(1);
      }

      const problemText = articles.map(articleToText).join('\n\n---\n\n') + '\n';

      fs.mkdirSync(problemsDir, { recursive: true });
      fs.writeFileSync(problemFile, problemText);
      console.log(`✓ Saved problem text to: ${problemFile}`);

      const solvedAnswers = [...data.matchAll(/Your puzzle answer was <code>([^<]*)<\/code>/g)].map(
        (match) => match[1]
      );

      if (solvedAnswers.length > 0) {
        const state = loadState(stateFile);
        solvedAnswers.forEach((answer, index) => {
          const part = `part${index + 1}`;
          state[part].solved = true;
          state[part].answer = answer;
        });
        saveState(stateFile, state);

        solvedAnswers.forEach((answer, index) => {
          console.log(`  Part ${index + 1} already solved (answer: ${answer})`);
        });
      }

      console.log('');
      console.log(`Next steps:`);
      console.log(`  📖 Read:   ${problemFile}`);
      console.log(`  🚀 Submit: npm run submit ${year} ${day} 1`);
    });
  })
  .on('error', (err) => {
    console.error('Error fetching problem text:', err.message);
    process.exit(1);
  });
