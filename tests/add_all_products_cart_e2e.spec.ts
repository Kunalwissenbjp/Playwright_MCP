import { test, expect } from '@playwright/test';

test('E2E: Add all products to cart and verify total', async ({ page }) => {
  // 1. Navigate to the site
  await page.goto('http://localhost:3000');

  // 2. Login
  await page.getByRole('textbox', { name: 'Username' }).fill('Shravan');
  await page.getByRole('textbox', { name: 'Password' }).fill('Shravan@123');
  await page.getByRole('button', { name: 'Login' }).click();

  // 3. Add all products to cart
  await page.getByRole('button', { name: '+' }).nth(0).click(); // Football
  await page.getByRole('button', { name: '+' }).nth(1).click(); // Cricket Bat
  await page.getByRole('button', { name: '+' }).nth(2).click(); // Tennis Racket
  await page.getByRole('button', { name: '+' }).nth(3).click(); // Basketball
  await page.getByRole('button', { name: '+' }).nth(4).click(); // Badminton Shuttle
  await page.getByRole('button', { name: '+' }).nth(5).click(); // Gym Gloves

  // 4. Go to cart
  await page.getByRole('button', { name: /Cart \(6\)/ }).click();

  // 5. Check cart contains products and total
  const cartItems = [
    'Football - ₹500 × 1 = ₹500',
    'Cricket Bat - ₹1200 × 1 = ₹1200',
    'Tennis Racket - ₹800 × 1 = ₹800',
    'Basketball - ₹600 × 1 = ₹600',
    'Badminton Shuttle - ₹200 × 1 = ₹200',
    'Gym Gloves - ₹300 × 1 = ₹300',
  ];
  for (const item of cartItems) {
    await expect(page.getByText(item)).toBeVisible();
  }
  await expect(page.getByText('Total Price: ₹3600')).toBeVisible();
});
