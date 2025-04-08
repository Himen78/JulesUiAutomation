// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  globalSetup: require.resolve('./Setup/global-setup'),
  use: {
    baseURL: 'https://demo.haroldwaste.com',
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    storageState: 'storageState.json'
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]]
});