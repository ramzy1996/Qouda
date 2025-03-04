import js from '@eslint/js'
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import vitestPlugin from 'eslint-plugin-vitest';
import checkFile from 'eslint-plugin-check-file';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  { ignores: ['dist'] },
  {
    // extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
    },
    plugins: {
      'check-file': checkFile,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
      prettier: prettierPlugin,
      vitest: vitestPlugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
        'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: './src/pages',
              message: 'Do not import from the "features" directory.',
            },
            {
              name: './src/app',
              message: 'Do not import from the "app" directory.',
            },
          ],
          patterns: ['./src/pages/*', './src/app/*'],
        },
      ],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'linebreak-style': 0,
      'react/prop-types': 'off',
      'simple-import-sort/imports': 'error', // Corrected rule for imports sorting
      'simple-import-sort/exports': 'error', // Corrected rule for exports sorting
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/explicit-function-return-type': ['off'],
      '@typescript-eslint/explicit-module-boundary-types': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/no-explicit-any': ['off'],
      'prettier/prettier': [
        'error',
        { endOfLine: 'auto' },
        { usePrettierrc: true },
      ],
      // Accessibility: Ensure click events are only added to interactive elements
      'jsx-a11y/no-static-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onKeyUp',
            'onKeyDown',
            'onKeyPress',
            'onMouseDown',
            'onMouseUp',
          ],
        },
      ],
      'jsx-a11y/no-noninteractive-element-interactions': [
        'error',
        {
          handlers: [
            'onClick',
            'onKeyUp',
            'onKeyDown',
            'onKeyPress',
            'onMouseDown',
            'onMouseUp',
          ],
          alert: true,
          elements: ['div', 'span', 'section', 'article', 'header', 'footer'],
        },
      ],

      // Import sorting rule configuration
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Node.js builtins.
            [
              '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
            ],
            // Packages.
            ['^react', '^@?\\w'],
            // Internal packages.
            ['^(@|@company|@ui|components|utils|config)(/.*|$)'],
            // Side effect imports.
            ['^\\u0000'],
            // Parent imports.
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // Other relative imports.
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // Style imports.
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
]
