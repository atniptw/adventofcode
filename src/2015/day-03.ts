type Position = [number, number];

const key = (p: Position): string => `${p[0]},${p[1]}`;

function move(pos: Position, dir: string): void {
  switch (dir) {
    case '^':
      pos[1]++;
      break;
    case 'v':
      pos[1]--;
      break;
    case '>':
      pos[0]++;
      break;
    case '<':
      pos[0]--;
      break;
  }
}

export function part1(input: string[]): number {
  let total = 0;
  for (const line of input) {
    const houses = new Set<string>();
    const pos: Position = [0, 0];
    const directions = line.split('');
    houses.add(key(pos));
    for (const dir of directions) {
      move(pos, dir);
      houses.add(key(pos));
    }
    total += houses.size;
  }
  return total;
}

export function part2(input: string[]): number {
  let total = 0;
  for (const line of input) {
    const houses = new Set<string>();
    const santaPos: Position = [0, 0];
    const roboPos: Position = [0, 0];
    const directions = line.split('');
    houses.add(key(santaPos));
    for (let i = 0; i < directions.length; i++) {
      const dir = directions[i]!;
      if (i % 2 === 0) {
        move(santaPos, dir);
        houses.add(key(santaPos));
      } else {
        move(roboPos, dir);
        houses.add(key(roboPos));
      }
    }
    total += houses.size;
  }
  return total;
}
