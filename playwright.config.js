import { devices } from '@playwright/test';

export default {
  use: {
    screenshot: 'on',
    video: 'on',
  },
  timeout: 30000,
  retries: 1,
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }], // Playwright HTML Report
    ['allure-playwright', { outputFolder: 'reports/allure-results' }], // Allure Results
  ],
  projects: [
    {
      name: 'login',
      testDir: 'tests/Seller-App/login',
      use: { ...devices['Desktop Chrome'] }, // Project-specific device
    },
    {
      name: 'dashboard',
      testDir: 'tests/Seller-App/dashboard',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};
