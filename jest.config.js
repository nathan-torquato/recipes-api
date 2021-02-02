module.exports = {
	roots: ['<rootDir>/tests'],
	collectCoverageFrom: ['<rootDir>/tests/**/*.ts'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	testEnvironment: 'node',
	transform: {
		'.+\\.ts$': 'ts-jest',
	},
	setupFilesAfterEnv: ['./jest.setup.js'],
};
