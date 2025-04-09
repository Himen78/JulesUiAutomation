// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory where test files are located
  testDir: './tests',

  // Global test timeout
  timeout: 80 * 1000, // 80 seconds per test

  globalSetup: require.resolve('./Setup/global-setup'),

  // Reporters: HTML for local debugging, add more if needed (e.g. 'list', 'junit')
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: 'https://demo.haroldwaste.com',
    headless: true, // Set to false only for debugging locally
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
    storageState: 'storageState.json',
  },
  // Directory to store test artifacts (screenshots, videos, etc.)
  outputDir: 'test-results',
});