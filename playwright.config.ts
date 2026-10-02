import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'list',
  outputDir: '/tmp/casa-ta-verde-test-results',
  use: { baseURL: 'http://localhost:4200', trace: 'retain-on-failure' },
  webServer: {
    command: 'npm start -- --host localhost',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1536, height: 1024 } },
    },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
});
