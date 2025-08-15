export interface Mapping {
    destStart: number;
    sourceStart: number;
    length: number;
}

export interface MappingCategory {
    name: string;
    mappings: Mapping[];
}

export interface ParsedInput {
    seeds: number[];
    categories: MappingCategory[];
}

export interface Range {
    start: number;
    end: number; // exclusive
}

export interface SeedRangeResult {
    seedRanges: Range[];
}

export function applyMapping(value: number, mappings: Mapping[]): number {
    for (const mapping of mappings) {
        const { destStart, sourceStart, length } = mapping;
        
        // Check if value is within this mapping's source range
        if (value >= sourceStart && value < sourceStart + length) {
            const offset = value - sourceStart;
            return destStart + offset;
        }
    }
    
    // If no mapping matches, return the original value
    return value;
}

export function transformSeedToLocation(seed: number, categories: MappingCategory[]): number {
    let value = seed;
    
    for (const category of categories) {
        value = applyMapping(value, category.mappings);
    }
    
    return value;
}

export function parseInput(input: string[]): ParsedInput {
    const seeds: number[] = [];
    const categories: MappingCategory[] = [];
    
    let currentCategory: MappingCategory | null = null;
    
    for (const line of input) {
        if (line.startsWith('seeds:')) {
            // Parse seeds line: "seeds: 79 14 55 13"
            const seedNumbers = line.substring(6).trim().split(/\s+/).map(n => parseInt(n));
            seeds.push(...seedNumbers);
        } else if (line.includes('map:')) {
            // Start of a new mapping category
            const categoryName = line.replace(' map:', '');
            currentCategory = { name: categoryName, mappings: [] };
            categories.push(currentCategory);
        } else if (line.trim() && currentCategory) {
            // Parse mapping line: "50 98 2"
            const [destStart, sourceStart, length] = line.trim().split(/\s+/).map(n => parseInt(n));
            currentCategory.mappings.push({ destStart, sourceStart, length });
        }
        // Skip empty lines
    }
    
    return { seeds, categories };
}

export function part1(input: string[]): number {
    const { seeds, categories } = parseInput(input);
    
    let minimumLocation = Infinity;
    
    for (const seed of seeds) {
        const location = transformSeedToLocation(seed, categories);
        minimumLocation = Math.min(minimumLocation, location);
    }
    
    return minimumLocation;
}

export function parseSeedRanges(seedLine: string): SeedRangeResult {
    const seedRanges: Range[] = [];
    const numbers = seedLine.substring(6).trim().split(/\s+/).map(n => parseInt(n));
    
    // Parse pairs of (start, length)
    for (let i = 0; i < numbers.length - 1; i += 2) {
        const start = numbers[i];
        const length = numbers[i + 1];
        seedRanges.push({ start, end: start + length });
    }
    
    return { seedRanges };
}

export function transformRange(inputRanges: Range[], mappings: Mapping[]): Range[] {
    const resultRanges: Range[] = [];
    let unmappedRanges = [...inputRanges];
    
    // Process each mapping rule
    for (const mapping of mappings) {
        const newUnmapped: Range[] = [];
        const mapStart = mapping.sourceStart;
        const mapEnd = mapping.sourceStart + mapping.length;
        const offset = mapping.destStart - mapping.sourceStart;
        
        // Check each unmapped range against this mapping
        for (const range of unmappedRanges) {
            // Case 1: No overlap - range stays unmapped
            if (range.end <= mapStart || range.start >= mapEnd) {
                newUnmapped.push(range);
                continue;
            }
            
            // Case 2: Overlap exists - split into parts
            
            // Part before mapping (if any)
            if (range.start < mapStart) {
                newUnmapped.push({
                    start: range.start,
                    end: mapStart
                });
            }
            
            // Part that overlaps (gets transformed)
            const overlapStart = Math.max(range.start, mapStart);
            const overlapEnd = Math.min(range.end, mapEnd);
            
            resultRanges.push({
                start: overlapStart + offset,
                end: overlapEnd + offset
            });
            
            // Part after mapping (if any)
            if (range.end > mapEnd) {
                newUnmapped.push({
                    start: mapEnd,
                    end: range.end
                });
            }
        }
        
        unmappedRanges = newUnmapped;
    }
    
    // Add any remaining unmapped ranges
    resultRanges.push(...unmappedRanges);
    return resultRanges;
}

export function part2(input: string[]): number {
    const { seeds, categories } = parseInput(input);
    
    // Parse seed pairs as ranges
    let ranges: Range[] = [];
    for (let i = 0; i < seeds.length - 1; i += 2) {
        const start = seeds[i];
        const length = seeds[i + 1];
        ranges.push({ start, end: start + length });
    }
    
    // Transform ranges through each category
    for (const category of categories) {
        ranges = transformRange(ranges, category.mappings);
    }
    
    // Find minimum start value among all final ranges
    let minimumLocation = Infinity;
    for (const range of ranges) {
        minimumLocation = Math.min(minimumLocation, range.start);
    }
    
    return minimumLocation;
}