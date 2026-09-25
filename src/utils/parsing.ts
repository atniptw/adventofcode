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

export function parseGroups(input: string[]): string[] {
  return input.join('\n').split('\n\n');
}

export function parseNumberColumns(input: string[], separator: string = ' '): number[][] {
  const columns: number[][] = [];

  input.forEach((line) => {
    const values = line.split(separator).filter((s) => s.trim() !== '');
    values.forEach((value, index) => {
      columns[index] ??= [];
      columns[index].push(parseInt(value.trim()));
    });
  });

  return columns;
}
