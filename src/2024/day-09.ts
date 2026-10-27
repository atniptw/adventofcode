import { getOrThrow, isDefined } from '../utils/index.js';

export function expandDiskMap(map: string): (number | null)[] {
  const blockSizes = map.split('').map(Number);
  const blocks: (number | null)[] = [];

  for (const [i, size] of blockSizes.entries()) {
    if (i % 2 === 0) {
      blocks.push(...Array(size).fill(i / 2));
    } else {
      blocks.push(...Array(size).fill(null));
    }
  }

  return blocks;
}

export function compact(blocks: (number | null)[]): (number | null)[] {
  const disk = [...blocks];

  let left = 0;
  let right = blocks.length - 1;

  while (left < right) {
    const block = disk[right];
    if (disk[left] === null && isDefined(block)) {
      disk[left] = block;
      disk[right] = null;
    }
    if (isDefined(disk[left])) left++;
    if (!isDefined(disk[right])) right--;
  }
  return disk;
}

export function findFile(disk: (number | null)[], id: number): { start: number; length: number } {
  const start = disk.findIndex((v) => v === id);
  const last = disk.findLastIndex((v) => v === id);
  return { start, length: last - start + 1 };
}

export function findGap(
  disk: (number | null)[],
  length: number,
  before: number
): number | undefined {
  let run = 0;
  for (let i = 0; i < before; i++) {
    run = disk[i] === null ? run + 1 : 0;
    if (run === length) return i - length + 1;
  }
  return;
}

export function moveFile(disk: (number | null)[], from: number, to: number, length: number): void {
  for (let i = 0; i < length; i++) {
    disk[to + i] = getOrThrow(disk[from + i]);
    disk[from + i] = null;
  }
}

export function compactFiles(blocks: (number | null)[]): (number | null)[] {
  const disk = [...blocks];

  for (let id = disk.findLast(isDefined) ?? -1; id >= 0; id--) {
    const file = findFile(disk, id);
    const gap = findGap(disk, file.length, file.start);
    if (gap !== undefined) moveFile(disk, file.start, gap, file.length);
  }

  return disk;
}

export function checksum(blocks: (number | null)[]): number {
  let total = 0;
  for (const [i, id] of blocks.entries()) {
    if (id === null) continue;
    total += i * id;
  }
  return total;
}

export function part1(input: string[]): number {
  return checksum(compact(expandDiskMap(getOrThrow(input[0]))));
}

export function part2(input: string[]): number {
  return checksum(compactFiles(expandDiskMap(getOrThrow(input[0]))));
}
