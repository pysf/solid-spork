/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: 'test',
    globalSetup: '<rootDir>/globalSetup.ts',
    globalTeardown: '<rootDir>/globalTeardown.ts',
}
