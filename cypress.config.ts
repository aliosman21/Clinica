import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: true,
        screenshotOnRunFailure: true,
        defaultCommandTimeout: 15000, // Increased for SSR
        requestTimeout: 15000,
        responseTimeout: 15000,
        pageLoadTimeout: 30000, // Allow more time for SSR pages
        waitForAnimations: true,
        animationDistanceThreshold: 5,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.ts',
    },
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
})