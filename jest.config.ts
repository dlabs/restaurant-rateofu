/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./jest.setup.ts'],
    // Add /dist/ to the ignore pattern to avoid testing tsc output
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
