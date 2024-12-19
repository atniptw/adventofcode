import fs from 'node:fs';
import readline from 'readline';
// import { dayOne } from './day-one';
// import { dayTwo } from './day-two';
// import { dayThree } from './day-three';
import { dayFour } from './day-four';

const reader = readline.createInterface({
  input: fs.createReadStream('./src/input.txt'),
  crlfDelay: Infinity
});

// dayOne(reader);
// dayTwo(reader);
// dayThree(reader);
dayFour(reader);