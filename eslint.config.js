// eslint.config.js – ESLint v9 configuration for the project
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  // Ignore generated, third‑party, and legacy script files
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'functions/node_modules/**',
      'scripts/**',
      'replace-imports.*',
      '**/__tests__/**',
      'Amazing Grace/**',
    ],
  },

  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        chrome: "readonly",
      },
      parser: tseslint.parser,
    },
    rules: {
      // Disable noisy rules for now
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      // Add or override other rules as needed
    },
  },
];
