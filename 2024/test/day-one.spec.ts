import { distance, similarity } from "../src/day-one";

describe('Day 1: Historian Hysteria', () => {
    describe("Part 1", () => {
        it("handles lists with single item", () => {
            const a = [1];
            const b = [3];
    
            expect(distance(a, b)).toBe(2);
        });
    
        it("calculates accumulated distance", () => {
            const a = [1, 2, 3, 3, 3 ,4];
            const b = [3, 3, 3, 4, 5, 9];
    
            expect(distance(a, b)).toBe(11);
        });
    
        it("calculates sorted accumulated distance", () => {
            const a = [3, 4, 2, 1, 3, 3];
            const b = [4, 3, 5, 3, 9, 3];
    
            expect(distance(a, b)).toBe(11);
        });
    });
    
    describe("Part 2", () => {
        it("handles base case", () => {
            const a = [3];
            const b = [3, 3, 3];
    
            expect(similarity(a, b)).toBe(9);
        });
    
        it("calculates accumulated similarity", () => {
            const a = [3, 4, 2, 1, 3, 3];
            const b = [4, 3, 5, 3, 9, 3];
    
            expect(similarity(a, b)).toBe(31);
        });
    });
});