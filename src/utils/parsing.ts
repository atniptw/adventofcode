export function parseNumbers(input: string[]): number[] {
  return input.map((line) => parseInt(line.trim()));
}

export function parseNumberGrid(input: string[], separator: string = ' '): number[][] {
  return input.map((line) =>
    line
      .split(separator)
      .filter((s) => s.trim() !== '')
      .map((s) => parseInt(s.trim()))
  );
}

export function parseNumberColumns(input: string[], separator: string = ' '): number[][] {
  const columns: number[][] = [];

  input.forEach((line) => {
    const values = line.split(separator).filter((s) => s.trim() !== '');
    values.forEach((value, index) => {
      if (!columns[index]) columns[index] = [];
      columns[index].push(parseInt(value.trim()));
    });
  });

  return columns;
}

export function parseCharGrid(input: string[]): string[][] {
  return input.map((line) => line.split(''));
}

export function joinLines(input: string[]): string {
  return input.join('');
}
