interface ParsedInput {
  desiredLights: string;
  buttons: number[][];
  desiredJoltages?: number[];
}

function parseInput(input: string): ParsedInput {
  const lightsMatch = input.match(/^\[([.#]+)\]/);
  const desiredLights = lightsMatch?.[1] ?? '';

  const buttonsMatch = input.matchAll(/\(([\d,]+)\)/g);
  const buttons = Array.from(buttonsMatch, (match) =>
    (match[1] ?? '').split(',').map((num) => parseInt(num, 10))
  );

  const joltagesMatch = input.match(/\{([\d,]+)\}/);
  const joltagesStr = joltagesMatch?.[1] ?? null;
  const desiredJoltages =
    joltagesStr !== null && joltagesStr !== ''
      ? joltagesStr.split(',').map((num) => parseInt(num, 10))
      : undefined;

  if (desiredJoltages === undefined) {
    return { desiredLights, buttons };
  }
  return { desiredLights, buttons, desiredJoltages };
}

function toggleLightsForButton(state: number, button: number[], numLights: number): number {
  let newState = state;
  for (const index of button) {
    if (index >= 0 && index < numLights) {
      newState ^= 1 << index;
    }
  }
  return newState;
}

export function calculateMovesForLights(input: string): number {
  const { desiredLights, buttons } = parseInput(input);
  const numLights = desiredLights.length;
  const targetState = desiredLights
    .split('')
    .reduce((acc, char, i) => acc | ((char === '#' ? 1 : 0) << i), 0);

  // BFS to find minimum number of button presses
  const queue: Array<{ state: number; moves: number[]; depth: number }> = [
    { state: 0, moves: [], depth: 0 },
  ];
  const visited = new Set<string>(['0']);

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (current.state === targetState) {
      return current.depth;
    }

    if (current.depth >= 5) continue;

    for (let i = 0; i < buttons.length; i++) {
      const newState = toggleLightsForButton(current.state, buttons[i]!, numLights);
      const newMoves = [...current.moves, i];
      const key = `${newState}`;

      if (!visited.has(key)) {
        visited.add(key);
        queue.push({ state: newState, moves: newMoves, depth: current.depth + 1 });
      }
    }
  }

  return -1;
}

export function calculateMovesForJoltages(_input: string): number {
  return -1;
}

export function part1(input: string[]): number {
  return input.reduce((total, line) => total + calculateMovesForLights(line), 0);
}

export function part2(_input: string[]): number {
  // return input.reduce((total, line) => total + calculateMovesForJoltages(line), 0);
  return 0;
}
