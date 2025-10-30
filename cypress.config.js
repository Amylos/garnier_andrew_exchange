const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    supportFile: 'tests/cypress/support/e2e.js',
    fixturesFolder: 'tests/cypress/fixtures',
    downloadsFolder: 'tests/cypress/downloads',
  },
})