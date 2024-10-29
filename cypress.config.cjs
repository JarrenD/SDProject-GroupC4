const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'mdowfz',
  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  video: true,
  videoCompression: true,
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
    baseUrl: 'https://polite-pond-04aadc51e.5.azurestaticapps.net',
    specPattern: 'src/test/e2e/**/*.cy.js',
  },
})
