import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://20.197.49.4:3001/login');
  await page.getByPlaceholder('Enter Email ID or Phone Number').click();
  await page.getByPlaceholder('Enter Email ID or Phone Number').fill('98jbhj99');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByText('Please enter a valid 10-digit').first().click();
  await page.getByRole('status').click();
});