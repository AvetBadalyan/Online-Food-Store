import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
	{ ignores: ['dist', 'node_modules', '.firebase'] },
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2022,
			globals: {
				...globals.browser
			},
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module'
			}
		},
		settings: {
			react: { version: 'detect' }
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		rules: {
			...js.configs.recommended.rules,
			...react.configs.recommended.rules,
			...react.configs['jsx-runtime'].rules,
			...reactHooks.configs.recommended.rules,
			// Disable all ESLint formatting rules that conflict with Prettier
			...prettier.rules,
			// New JSX transform — no need to import React in scope
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			// Apostrophes/quotes in JSX text render fine; not worth escaping
			'react/no-unescaped-entities': 'off',
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
			// Catch undefined identifiers and dead imports
			'no-undef': 'error',
			'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }]
		}
	},
	{
		// Config files run in Node
		files: ['*.config.js'],
		languageOptions: {
			globals: { ...globals.node }
		}
	}
]
