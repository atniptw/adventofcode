import fs from 'node:fs';
import readline from 'readline'
// import { dayOne } from './day-one';
import { dayTwo } from './day-two';

const reader = readline.createInterface({
  input: fs.createReadStream('./src/input.txt'),
  crlfDelay: Infinity
});

// dayOne(reader);
dayTwo(reader);