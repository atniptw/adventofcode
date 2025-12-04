// Helper to parse a move string (e.g., 'L68' or 'R50')
function parseMove(val: string): number {
  if (val.startsWith('R')) return -parseInt(val.slice(1));
  if (val.startsWith('L')) return parseInt(val.slice(1));
  return 0;
}

// Helper to move the dial with wraparound
function moveDial(dial: number, move: number): number {
  return (dial + move + 100) % 100;
}

/**
 * Part 1: Count how many times the dial lands exactly on 0 after a move.
 */
export function part1(input: string[]): number {
  let dial = 50;
  let count = 0;
  for (const val of input) {
    dial = moveDial(dial, parseMove(val));
    if (dial === 0) count++;
  }
  return count;
}

/**
 * Part 2: Count how many times the dial lands on 0 or passes over 0 (wraps around),
 * but do not double-count if starting at 0.
 */
export function part2(input: string[]): number {
  let dial = 50;
  let count = 0;
  for (const val of input) {
    const move = parseMove(val);
    if (move === 0) {
      if (dial === 0) count++;
    } else {
      for (let i = 1; i <= Math.abs(move); i++) {
        let pos;
        if (move > 0) {
          pos = (dial + i) % 100;
        } else {
          pos = (dial - i + 100) % 100;
        }
        if (pos === 0) {
          count++;
        }
      }
    }
    dial = moveDial(dial, move);
  }
  return count;
}
