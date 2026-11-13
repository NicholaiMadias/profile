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
      },
      parser: tseslint.parser,
    },
    rules: {
      // Add or override rules here as needed
      // Example: enforce semi-colons
      // '@typescript-eslint/semi': ['error', 'always'],
    },
  },
];
