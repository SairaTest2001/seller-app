import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://20.197.49.4:3001/login');
  await page.getByPlaceholder('Enter Email ID or Phone Number').click();
  await page.getByPlaceholder('Enter Email ID or Phone Number').fill('sellerapp_admin@adya.ai');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#otp-0').fill('9');
  await page.locator('#otp-1').fill('8');
  await page.locator('#otp-2').fill('7');
  await page.locator('#otp-3').fill('4');
  await page.locator('#otp-4').fill('5');
  await page.locator('#otp-5').fill('3');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await page.getByText('OTP verification failed - no').first().click();
  await page.getByRole('status').click();
});