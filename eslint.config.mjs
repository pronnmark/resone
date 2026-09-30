import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**', 'reference/**'] },
  js.configs.recommended,
  { files: ['scripts/**'], languageOptions: { globals: { process: 'readonly', console: 'readonly' } } },
  { rules: { 'no-empty': ['error', { allowEmptyCatch: true }], 'no-control-regex': 'off' } },
  ...tseslint.configs.recommended,
  { files: ['src/**/*.{ts,tsx}'], plugins: { 'react-hooks': reactHooks }, rules: reactHooks.configs.recommended.rules },
);
