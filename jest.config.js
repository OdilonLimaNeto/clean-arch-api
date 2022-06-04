module.exports = {
  roots: ["<rootDir>/src"],
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
