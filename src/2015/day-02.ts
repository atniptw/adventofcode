type Dimensions = [number, number, number];

function parseDims(line: string): Dimensions | null {
  const trimmed = line.trim();
  if (trimmed === '') return null;
  const parts = trimmed.split('x').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  return [parts[0] as number, parts[1] as number, parts[2] as number];
}

export function part1(input: string[]): number {
  let total = 0;
  for (const box of input) {
    const dims = parseDims(box);
    if (!dims) continue;
    const [length, width, height] = dims;
    const sides = [length * width, width * height, height * length];
    const surfaceArea = 2 * sides.reduce((a, b) => a + b, 0);
    const smallestSide = Math.min(...sides);
    total += surfaceArea + smallestSide;
  }
  return total;
}

export function part2(input: string[]): number {
  let total = 0;
  for (const box of input) {
    const dims = parseDims(box);
    if (!dims) continue;
    const [length, width, height] = dims;
    const sortedDims = [length, width, height].sort((a, b) => a - b) as [number, number, number];
    const ribbonLength = 2 * (sortedDims[0] + sortedDims[1]);
    const bowLength = length * width * height;
    total += ribbonLength + bowLength;
  }
  return total;
}
