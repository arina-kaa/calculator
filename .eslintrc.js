module.exports = {
	root: true,
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:jest/recommended',
	],
	plugins: ['@typescript-eslint', 'prettier', 'jest'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	rules: {
		'max-len': [
			'error',
			{
				code: 100,
			},
		],
		'prettier/prettier': 'error',
		semi: ['error', 'never'],
		quotes: ['error', 'single'],
	},
	overrides: [
		{
			files: ['webpack.config.js'],
			rules: {
				'@typescript-eslint/no-var-requires': ['off'],
			},
		},
		{
			files: ['*.stories.tsx'],
			rules: {
				'no-restricted-syntax': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
			},
		},
		{
			files: ['*.test.tsx', '*.test.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
			},
		},
	],
}