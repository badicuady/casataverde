import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  timeout: 45000,
  expect: { timeout: 8000 },
  fullyParallel: false,
  workers: 2,
  reporter: [['list'], ['json', { outputFile: 'explore/validation/browser-results.json' }]],
  use: {
    baseURL: 'http://localhost:4321',
    viewport: { width: 1440, height: 1000 },
    launchOptions: {
      executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
      args: ['--no-sandbox'],
    },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'HOST=127.0.0.1 PORT=4321 npm start',
    url: 'http://localhost:4321',
    reuseExistingServer: true,
    timeout: 20000,
  },
});
