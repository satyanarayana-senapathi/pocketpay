// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { defaults } = require('jest-config')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/App.tsx',
    '!src/index.tsx',
    '!src/**/*.{d,stories}.{ts,tsx}',
    '!src/components/molecules/IconGrid/createThirdPartySignUpArray.tsx',
  ],
  moduleNameMapper: {
    '\\.(svg)$': 'jest-svg-transformer',
    '\\.css$': 'identity-obj-proxy',
  },
}
