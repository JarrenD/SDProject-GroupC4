const paths = require('path');

module.exports = function override(config, env) {
  // Customize your Jest configuration here
  config.setupFiles = [paths.resolve(__dirname, 'jest.setup.js')];
  return config;
};
