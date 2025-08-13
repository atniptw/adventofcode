import { sum } from '@aoc/utils';

interface CubeSet {
    red: number;
    green: number;
    blue: number;
}

interface Game {
    id: number;
    sets: CubeSet[];
}

function parseGame(line: string): Game {
    const [gameStr, setsStr] = line.split(':');
    const id = parseInt(gameStr!.replace('Game ', ''));
    
    const sets = setsStr!.split(';').map(setStr => {
        const set: CubeSet = { red: 0, green: 0, blue: 0 };
        
        const cubes = setStr.trim().split(',');
        for (const cube of cubes) {
            const [countStr, color] = cube.trim().split(' ');
            const count = parseInt(countStr!);
            
            if (color === 'red') set.red = count;
            else if (color === 'green') set.green = count;
            else if (color === 'blue') set.blue = count;
        }
        
        return set;
    });
    
    return { id, sets };
}

export function part1(input: string[]): number {
    const maxRed = 12;
    const maxGreen = 13;
    const maxBlue = 14;
    
    const possibleGames: number[] = [];
    
    for (const line of input) {
        if (!line.trim()) continue;
        
        const game = parseGame(line);
        let isPossible = true;
        
        for (const set of game.sets) {
            if (set.red > maxRed || set.green > maxGreen || set.blue > maxBlue) {
                isPossible = false;
                break;
            }
        }
        
        if (isPossible) {
            possibleGames.push(game.id);
        }
    }
    
    return sum(possibleGames);
}

export function part2(input: string[]): number {
    const powers: number[] = [];
    
    for (const line of input) {
        if (!line.trim()) continue;
        
        const game = parseGame(line);
        
        // Find minimum cubes needed for each color
        let minRed = 0;
        let minGreen = 0;
        let minBlue = 0;
        
        for (const set of game.sets) {
            minRed = Math.max(minRed, set.red);
            minGreen = Math.max(minGreen, set.green);
            minBlue = Math.max(minBlue, set.blue);
        }
        
        // Calculate power (product of minimum cubes)
        const power = minRed * minGreen * minBlue;
        powers.push(power);
    }
    
    return sum(powers);
}