import { test, expect } from '@playwright/test';

test('E2E: Login, add products, verify cart and sum', async ({ page }) => {
  // 1. Navigate to the website
  await page.goto('https://localhost:3000');

  // 2. Login
  await page.fill('input[name="username"]', 'Shravan');
  await page.fill('input[name="password"]', 'Shravan@123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/.*dashboard.*/);

  // 3. Add products into the cart
  const products = await page.$$('.product-item');
  let expectedSum = 0;
  for (const product of products) {
    const priceText = await product.$('.product-price');
    const priceValue = priceText ? await priceText.textContent() : '0';
    const price = parseFloat(priceValue.replace(/[^\d.]/g, ''));
    expectedSum += price;
    const addToCartBtn = await product.$('.add-to-cart');
    if (addToCartBtn) {
      await addToCartBtn.click();
    }
  }

  // 4. Check cart contains the products
  await page.click('#cart-icon');
  const cartItems = await page.$$('.cart-item');
  expect(cartItems.length).toBe(products.length);

  // 5. Check sum of all the product
  const totalTextEl = await page.$('.cart-total');
  const totalText = totalTextEl ? await totalTextEl.textContent() : '0';
  const total = parseFloat(totalText.replace(/[^\d.]/g, ''));
  expect(total).toBeCloseTo(expectedSum, 2);
});
