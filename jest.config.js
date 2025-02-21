const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    'next-view-transitions': '<rootDir>/__mocks__/next-view-transitions.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
};

module.exports = createJestConfig(customJestConfig);
