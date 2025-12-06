import { parseNumberGrid } from '../utils/index.js';

function applyOperator(numbers: number[], operator: string): number {
  switch (operator) {
    case '+':
      return numbers.reduce((a, b) => a + b, 0);
    case '*':
      return numbers.reduce((a, b) => a * b, 1);
    default:
      throw new Error(`Unknown operator: ${operator}`);
  }
}

function transposeGrid(grid: number[][]): number[][] {
  if (grid.length === 0) return [];
  const cols = grid[0]?.length ?? 0;
  return Array.from({ length: cols }, (_, c) => grid.map((row) => row[c] ?? 0));
}

function parseVerticalColumns(input: string[]): number[][] {
  const dataRows = input.slice(0, -1);
  const width = input[0]?.length ?? 0;
  const columns: number[][] = [];
  let currentColumn: number[] = [];

  for (let col = 0; col < width; col++) {
    const verticalStr = dataRows.map((row) => row[col] ?? ' ').join('');
    const num = parseInt(verticalStr.trim());

    if (!isNaN(num)) {
      currentColumn.push(num);
    } else if (currentColumn.length > 0) {
      columns.push(currentColumn);
      currentColumn = [];
    }
  }

  if (currentColumn.length > 0) {
    columns.push(currentColumn);
  }

  return columns;
}

export function part1(input: string[]): number {
  const grid = parseNumberGrid(input).slice(0, -1);
  const operators = input[input.length - 1]?.trim().split(/\s+/) ?? [];
  const columns = transposeGrid(grid);
  return sum(columns.map((col, idx) => applyOperator(col, operators[idx] ?? '+')));
}

export function part2(input: string[]): number {
  const operators = input[input.length - 1]?.trim().split(/\s+/) ?? [];
  const columns = parseVerticalColumns(input);
  return sum(columns.map((col, idx) => applyOperator(col, operators[idx] ?? '+')));
}
