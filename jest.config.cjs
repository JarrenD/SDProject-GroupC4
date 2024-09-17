// jest.config.cjs
module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest",
  },
  collectCoverage: true,
  coverageReporters: ['text', 'cobertura'],
};
