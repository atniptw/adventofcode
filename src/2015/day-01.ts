export function part1(input: string[]): number {
  const chars = input.join('');
  return chars.split('').reduce((floor, c) => floor + (c === '(' ? 1 : c === ')' ? -1 : 0), 0);
}

export function part2(input: string[]): number {
  const chars = input.join('');
  let floor = 0;
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    floor += c === '(' ? 1 : c === ')' ? -1 : 0;
    if (floor === -1) return i + 1;
  }
  return -1;
}
