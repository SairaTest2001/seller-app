import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://20.197.49.4:3001/login');
  await page.getByPlaceholder('Enter Email ID or Phone Number').click();
  await page.getByPlaceholder('Enter Email ID or Phone Number').fill('ms_branch@tmail.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.locator('#otp-0').fill('1');
  await page.locator('#otp-1').fill('2');
  await page.locator('#otp-2').fill('3');
  await page.locator('#otp-3').fill('4');
  await page.locator('#otp-4').fill('5');
  await page.locator('#otp-5').fill('6');
  await page.getByRole('button', { name: 'Verify & Continue' }).click();
  await page.getByRole('button', { name: 'MS Test Branch' }).click();
  await page.getByText('Total Revenue').click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByText('Total Partners').click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByText('Total Orders').click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByText('Total Sellers').click();
  await page.getByRole('link', { name: 'Dashboard' }).click();
  await page.getByRole('button', { name: 'MS Test Branch' }).click();
});