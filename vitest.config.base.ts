import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export const createVitestConfig = (workspaceRoot: string) => defineConfig({
  esbuild: {
    target: 'node18'
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@aoc/utils': resolve(workspaceRoot, '../../packages/aoc-utils/src/index.ts'),
    },
  },
});