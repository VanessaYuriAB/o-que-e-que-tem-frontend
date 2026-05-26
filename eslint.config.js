// Setup limpo para React + ESLint + Prettier

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  {
    ignores: ['dist', 'vite.config.js'],
  },

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // regras úteis do eslint-plugin-import
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/no-duplicates': 'warn',
    },
  },

  // sempre por último para desativar conflitos de formatação com Prettier
  eslintConfigPrettier,
];
