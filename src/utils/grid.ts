export type Point = { row: number; col: number };
export type Direction = 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';

export class Grid<T> {
    constructor(private data: T[][]) {}

    static fromStrings(input: string[]): Grid<string> {
        return new Grid(input.map(line => line.split('')));
    }

    get rows(): number {
        return this.data.length;
    }

    get cols(): number {
        return this.data[0]?.length || 0;
    }

    get(point: Point): T | undefined {
        return this.data[point.row]?.[point.col];
    }

    set(point: Point, value: T): void {
        if (this.isInBounds(point)) {
            this.data[point.row][point.col] = value;
        }
    }

    isInBounds(point: Point): boolean {
        return point.row >= 0 && point.row < this.rows && 
               point.col >= 0 && point.col < this.cols;
    }

    findAll(predicate: (value: T) => boolean): Point[] {
        const points: Point[] = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (predicate(this.data[row][col])) {
                    points.push({ row, col });
                }
            }
        }
        return points;
    }

    findFirst(predicate: (value: T) => boolean): Point | undefined {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (predicate(this.data[row][col])) {
                    return { row, col };
                }
            }
        }
        return undefined;
    }

    getNeighbor(point: Point, direction: Direction): Point {
        const { row, col } = point;
        switch (direction) {
            case 'up': return { row: row - 1, col };
            case 'down': return { row: row + 1, col };
            case 'left': return { row, col: col - 1 };
            case 'right': return { row, col: col + 1 };
            case 'up-left': return { row: row - 1, col: col - 1 };
            case 'up-right': return { row: row - 1, col: col + 1 };
            case 'down-left': return { row: row + 1, col: col - 1 };
            case 'down-right': return { row: row + 1, col: col + 1 };
        }
    }

    getNeighbors(point: Point, includeDiagonals: boolean = false): Point[] {
        const directions: Direction[] = includeDiagonals 
            ? ['up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right']
            : ['up', 'down', 'left', 'right'];
        
        return directions
            .map(dir => this.getNeighbor(point, dir))
            .filter(p => this.isInBounds(p));
    }

    getLine(start: Point, direction: Direction, length: number): T[] {
        const line: T[] = [];
        let current = start;
        
        for (let i = 0; i < length; i++) {
            const value = this.get(current);
            if (value === undefined) break;
            line.push(value);
            current = this.getNeighbor(current, direction);
        }
        
        return line;
    }

    countWordOccurrences(word: string): number {
        if (!(this.data[0]?.[0] instanceof String || typeof this.data[0]?.[0] === 'string')) {
            return 0;
        }

        let count = 0;
        const directions: Direction[] = ['right', 'down', 'down-right', 'down-left'];
        const reverseWord = word.split('').reverse().join('');

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const start = { row, col };
                
                directions.forEach(direction => {
                    const line = this.getLine(start, direction, word.length);
                    const lineStr = line.join('');
                    if (lineStr === word || lineStr === reverseWord) {
                        count++;
                    }
                });
            }
        }

        return count;
    }

    forEach(callback: (value: T, point: Point) => void): void {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                callback(this.data[row][col], { row, col });
            }
        }
    }

    map<U>(callback: (value: T, point: Point) => U): Grid<U> {
        const newData: U[][] = [];
        for (let row = 0; row < this.rows; row++) {
            newData[row] = [];
            for (let col = 0; col < this.cols; col++) {
                newData[row][col] = callback(this.data[row][col], { row, col });
            }
        }
        return new Grid(newData);
    }

    clone(): Grid<T> {
        return new Grid(this.data.map(row => [...row]));
    }

    toString(): string {
        return this.data.map(row => row.join('')).join('\n');
    }
}