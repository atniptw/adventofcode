export * from './parsing.js';
export * from './grid.js';
export * from './math.js';

// Helpers to reduce repetitive undefined checks
export function assertDefined<T>(value: T | undefined | null, message = 'Expected value to be defined'): NonNullable<T> {
	if (value === undefined || value === null) {
		throw new Error(message);
	}
	return value as NonNullable<T>;
}

export function getOrDefault<T>(value: T | undefined | null, defaultValue: T): T {
	return (value ?? defaultValue) as T;
}

export function getOrThrow<T>(value: T | undefined | null, message?: string): NonNullable<T> {
	return assertDefined(value, message);
}

export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
	return value !== undefined && value !== null;
}
