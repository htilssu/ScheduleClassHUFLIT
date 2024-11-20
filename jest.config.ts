import { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],

  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default config;