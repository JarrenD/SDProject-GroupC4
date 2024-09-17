// jest.config.cjs
module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "babel-jest",
  },
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
