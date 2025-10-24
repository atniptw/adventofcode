import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';
import vitestPlugin from '@vitest/eslint-plugin';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.strict,


  // Global ignores for build artifacts and deps
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },

  // TypeScript files in `src/` — enable type-aware rules using the project's tsconfig
  {
    files: ['src/**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
      // Use the official TypeScript parser so TS-specific rules run correctly
      parser: tseslint.parser,
      parserOptions: {
        // typed linting for source files only
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      // TypeScript-specific rules (type-aware)
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error', 
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],

      // General best practices
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
    },
  },

  // JS files - disable type-checked rules (fast lint for JS)
  {
    files: ['**/*.js', '**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },

  // Built artifacts — avoid applying type-aware rules to compiled files
  {
    files: ['build/**/*.*'],
    rules: {
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Vitest recommended configuration (provides globals and basic rules)
  vitestPlugin.configs.recommended,

  // TypeScript test files
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    rules: {
      'vitest/expect-expect': 'error',
      'vitest/no-conditional-tests': 'warn',
      'vitest/no-identical-title': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/prefer-to-be': 'error',
    },
  },

  // JavaScript test files
  {
    files: ['**/*.spec.js', '**/*.test.js'],
    plugins: {
      vitest: vitestPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...vitestPlugin.environments.env.globals,
      },
    },
    rules: {
      'vitest/expect-expect': 'error',
      'vitest/no-conditional-tests': 'warn',
      'vitest/no-identical-title': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/prefer-to-be': 'error',
    },
  },

  // Default language options for any other files
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Put Prettier last so it can turn off conflicting rules from other configs
  prettierConfig
);
