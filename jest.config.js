/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "src": "<rootDir>/src"
  },
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"]
};
