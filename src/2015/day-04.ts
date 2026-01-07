import { createHash } from 'crypto';

function findSecretNumber(secretKey: string, zeroCount: number): number {
    const prefix = '0'.repeat(zeroCount);
    let n = 0;
    while (true) {
        const hash = createHash('md5').update(secretKey + n).digest('hex');
        if (hash.startsWith(prefix)) return n;
        n++;
    }
}

export function part1(input: string[]): number {
    return findSecretNumber(input[0]!, 5);
}

export function part2(input: string[]): number {
    return findSecretNumber(input[0]!, 6);
}