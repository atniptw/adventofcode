import readline from 'readline';

export function distance(a: number[], b: number[]): number {
    let sum = 0;
    a.sort();
    b.sort();
    for (let i = 0; i < a.length; i++) {
        sum += Math.abs(a[i] - b[i]);
    }

    return sum;
}

export function similarity(a: number[], b: number[]): number {
    let sum = 0;
    a.forEach(element => {
        const matches = b.filter((value: number) => { return value === element; });
        sum = sum + (element * matches.length);
    });
    return sum;
}

export function dayOne(reader: readline.Interface) {
    const one: number[] = [];
    const two: number[] = [];
    reader.on('line', (line) => {
      const [a, b] = line.split('   ');
      one.push(parseInt(a));
      two.push(parseInt(b));
    })
      .on('close', () => {
        console.log(`Day One Part One: ${distance(one, two)}`);
        console.log(`Day One Part Two: ${similarity(one, two)}`);
      });  
}