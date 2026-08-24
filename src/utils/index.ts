export * from './parsing.js';
export * from './math.js';

// Helpers to reduce repetitive undefined checks
export function getOrThrow<T>(value: T | undefined | null, message?: string): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(message ?? 'Expected value to be defined');
  }
  return value as NonNullable<T>;
}

export function isDefined<T>(value: T | undefined | null): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
