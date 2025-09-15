/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testEnvironmentOptions: {
    html: '<html lang="en-US"><body><div id="root"></div></body></html>',
    url: 'http://localhost:3000',
    userAgent: 'node.js',
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/api/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    // Temporarily exclude large component files until they have tests
    '!components/**',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  testMatch: [
    '**/__tests__/**/*.(js|jsx|ts|tsx)',
    '**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Mock isolation configuration
  clearMocks: true, // Clear mock call history before every test
  restoreMocks: false, // Don't restore original implementations (would break mocks)
  
  // CI-specific configuration  
  testTimeout: process.env.CI ? 15000 : 10000, // 15s in CI, 10s locally
  maxWorkers: process.env.CI ? 2 : '50%', // Limit workers in CI
  bail: process.env.CI ? 1 : 0, // Stop on first failure in CI
  forceExit: process.env.CI, // Force exit in CI to prevent hanging
  detectOpenHandles: process.env.CI, // Detect open handles in CI
}

module.exports = config
