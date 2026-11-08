import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  {
    ignores: [
      'browser-agent/public/app.js',
      'nexus-public/companion/public/app.js'
    ]
  },
  ...nextCoreWebVitals,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/alt-text': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react/no-unescaped-entities': 'off',
      'no-unused-vars': 'warn'
    }
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
];
