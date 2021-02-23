module.exports = {
  displayName: 'bundle',
  testEnvironment: 'node',
  testMatch: ['**/*.test.{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  roots: ['<rootDir>/src'],
  moduleDirectories: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFiles: [
    '<rootDir>/config/jest/env.setup.js',
    '<rootDir>/config/jest/global.polyfill.js'
  ],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/mocks/',
    '/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
}
