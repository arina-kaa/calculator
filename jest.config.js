/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	collectCoverageFrom: ['./src/**'],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 70,
			lines: 80,
		},
	},
}
