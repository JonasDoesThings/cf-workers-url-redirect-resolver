import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: ['.wrangler/'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@stylistic/member-delimiter-style': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'args': 'none' }],
    },
  },
);
