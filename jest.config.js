module.exports = {
    // The test environment that will be used for testing
    testEnvironment: 'node',
    // The glob patterns Jest uses to detect test files
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    // The module file extensions that Jest will look for
    moduleFileExtensions: ['js', 'json', 'node'],
    // The root of your source code
    roots: ['<rootDir>'],
};