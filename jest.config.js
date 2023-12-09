module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@src(.*)$": "<rootDir>/src$1",
    "^@tests(.*)$": "<rootDir>/tests$1",
  } 
};
