import readline from 'readline';

function countWordOccurrences(wordSearch: string[][], wordToFind: string): number {
    let count = 0;
    const reverseWordToFind = [...wordToFind].reverse().join('');

    for (let i = 0; i < wordSearch.length; i++) {
        for (let j = 0; j < wordSearch[i].length; j++) {

            // Check horizontal
            if (j + wordToFind.length <= wordSearch[i].length) {
                const horizontal = wordSearch[i].slice(j, j + wordToFind.length).join('');
                if (horizontal === wordToFind || horizontal === reverseWordToFind) {
                    count++;
                }
            }

            // Check vertical
            let vertical = '';
            for (let k = 0; k < wordToFind.length && i + k < wordSearch.length; k++) {
                vertical += wordSearch[i + k][j];
            }
            if (vertical === wordToFind || vertical === reverseWordToFind) {
                count++;
            }

            // Check diagonally top left to bottom right 
            let diagonal = '';
            for (let k = 0; k < wordToFind.length && i + k < wordSearch.length && j + k < wordSearch[i].length; k++) {
                diagonal += wordSearch[i + k][j + k];
            }
            if (diagonal === wordToFind || diagonal === reverseWordToFind) {
                count++;
            }

            // Check diagonally top right to bottom left 
            diagonal = '';
            for (let k = 0; k < wordToFind.length && i + k < wordSearch.length && j - k > -1; k++) {
                diagonal += wordSearch[i + k][j - k];
            }
            if (diagonal === wordToFind || diagonal === reverseWordToFind) {
                count++;
            }
        }
    }

    return count;
}

export function part1(input: string[]): number {
    const puzzle: string[][] = [];
    input.forEach((line) => {
        const row = line.split('');
        puzzle.push(row);
    });

    return countWordOccurrences(puzzle, 'XMAS');
}

export function dayFour(reader: readline.Interface) {
    const input: string[] = [];

    reader
        .on('line', (line: string) => {
            input.push(line);
        })
        .on('close', () => {
            console.log(`Day Four Part One: ${part1(input)}`);
            // console.log(`Day Three Part Two: ${mullItOver(input)}`);
        });
}