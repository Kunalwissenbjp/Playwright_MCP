import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';

test('E2E: Add all products to cart and verify total (POM)', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);

  await loginPage.goto();
  await loginPage.login('Shravan', 'Shravan@123');
  await productsPage.addAllProductsToCart();
  await productsPage.goToCart();
  await cartPage.verifyCartItemsAndTotal();
});
