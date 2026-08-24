import fs from 'fs';
import path from 'path';

export function defaultState() {
  return {
    part1: { solved: false, answer: null, wrongGuesses: [] },
    part2: { solved: false, answer: null, wrongGuesses: [] },
  };
}

export function stateFilePath(yearDir, dayPadded) {
  return path.join(yearDir, 'problems', `day-${dayPadded}.state.json`);
}

export function loadState(stateFile) {
  if (!fs.existsSync(stateFile)) {
    return defaultState();
  }
  return { ...defaultState(), ...JSON.parse(fs.readFileSync(stateFile, 'utf8')) };
}

export function saveState(stateFile, state) {
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2) + '\n');
}
