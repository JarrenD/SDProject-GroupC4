module.exports = {
    testEnvironment: 'jsdom',
    testMatch: [
      "**/test/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    collectCoverage: true,
    coverageReporters: ['text', 'cobertura'],  // 'text' shows coverage in terminal
  };
  