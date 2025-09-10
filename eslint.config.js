const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const globals = require('globals')
const tseslint = require('typescript-eslint')
const prettierConfig = require('eslint-config-prettier')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const pluginQuery = require('@tanstack/eslint-plugin-query')

module.exports = defineConfig([
	// Base configuration for Expo projects
	expoConfig,
	...pluginQuery.configs['flat/recommended'],
	// Global ignores
	{
		ignores: ['dist/*', 'node_modules/*', '.expo/*']
	},
	// Base ESLint and import sorting for all relevant files
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		}
	},
	// Stricter TypeScript rules, adapted from your backend config
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.json'
			}
		},
		rules: {
			...tseslint.configs.recommendedTypeChecked.rules,
			// Enforce explicit return types for functions
			'@typescript-eslint/explicit-function-return-type': 'error',

			// Disallow the `any` type
			'@typescript-eslint/no-explicit-any': 'error',

			// Enforce handling of promises
			'@typescript-eslint/no-floating-promises': 'error',
			'@typescript-eslint/no-misused-promises': 'error',

			// Code quality and consistency
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_'
				}
			],
			'@typescript-eslint/consistent-type-imports': 'error',

			// IMPORTANT: A great rule from your backend to enforce proper env var handling
			'no-restricted-properties': [
				'error',
				{
					object: 'process',
					property: 'env',
					message:
						'Direct access to process.env is forbidden. Create and import from a dedicated env module instead (e.g., using expo-constants).'
				}
			]
		}
	},
	// Override for src/config/env.ts to ALLOW process.env (adjust path if needed)
	{
		files: ['src/config/env.ts', 'hot-updater.config.ts', 'app.config.ts', 'src/**'], // Adjust this path when you create your env file
		rules: {
			'no-restricted-properties': 'off'
		}
	},
	// Relaxed rules for configuration files at the root
	{
		files: ['*.config.js', '*.config.ts', 'babel.config.js'],
		languageOptions: {
			globals: {
				...globals.node
			}
		},
		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off'
		}
	},
	// This must be the LAST item in the array to disable all conflicting rules
	prettierConfig
])
