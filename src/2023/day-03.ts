interface NumberInfo {
  value: number;
  row: number;
  startCol: number;
  endCol: number;
}

interface SymbolInfo {
  char: string;
  row: number;
  col: number;
}

function parseGrid(input: string[]): { numbers: NumberInfo[]; symbols: SymbolInfo[] } {
  const numbers: NumberInfo[] = [];
  const symbols: SymbolInfo[] = [];

  for (let row = 0; row < input.length; row++) {
    const line = input[row];
    if (line === undefined || line.length === 0) continue;

    let col = 0;

    while (col < line.length) {
      const char = line[col];
      if (char === undefined || char.length === 0) {
        col++;
        continue;
      }

      if (/\d/.test(char)) {
        const startCol = col;
        let numStr = '';

        while (col < line.length && line[col] !== undefined && /\d/.test(line[col]!)) {
          numStr += line[col]!;
          col++;
        }

        numbers.push({
          value: parseInt(numStr),
          row,
          startCol,
          endCol: col - 1,
        });
      } else if (char !== '.' && char !== '') {
        symbols.push({
          char,
          row,
          col,
        });
        col++;
      } else {
        col++;
      }
    }
  }

  return { numbers, symbols };
}

function isAdjacent(number: NumberInfo, symbol: SymbolInfo): boolean {
  const rowDiff = Math.abs(number.row - symbol.row);
  if (rowDiff > 1) return false;

  for (let col = number.startCol; col <= number.endCol; col++) {
    const colDiff = Math.abs(col - symbol.col);
    if (colDiff <= 1) {
      return true;
    }
  }

  return false;
}

export function part1(input: string[]): number {
  if (input.length === 0 || (input.length === 1 && input[0] === '')) {
    return 0;
  }

  const { numbers, symbols } = parseGrid(input);

  let sum = 0;
  for (const number of numbers) {
    for (const symbol of symbols) {
      if (isAdjacent(number, symbol)) {
        sum += number.value;
        break;
      }
    }
  }

  return sum;
}

export function part2(input: string[]): number {
  if (input.length === 0 || (input.length === 1 && input[0] === '')) {
    return 0;
  }

  const { numbers, symbols } = parseGrid(input);
  const gears = symbols.filter((s) => s.char === '*');

  let sum = 0;
  for (const gear of gears) {
    const adjacentNumbers = numbers.filter((num) => isAdjacent(num, gear));

    if (adjacentNumbers.length === 2) {
      const first = adjacentNumbers[0];
      const second = adjacentNumbers[1];
      if (first && second) {
        sum += first.value * second.value;
      }
    }
  }

  return sum;
}
