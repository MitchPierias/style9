module.exports = {
  projects: ['<rootDir>/applications/web', '<rootDir>/applications/services'],
  roots: ['<rootDir>/packages'],
  moduleDirectories: ['<rootDir>/node_modules'],
  setupFiles: ['<rootDir>/config/jest/env.setup.js', '<rootDir>/config/jest/global.polyfill.js'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/contracts/', '/stories/', '/config/', '/interfaces/', '/mocks/', '/index.ts'],
  coverageThreshold: {
    global: {
      branches: 69.14,
      functions: 69,
      lines: 79.35,
      statements: 69
    }
  }
}
