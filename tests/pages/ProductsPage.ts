import { Page } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  async addAllProductsToCart() {
    for (let i = 0; i < 6; i++) {
      await this.page.getByRole('button', { name: '+' }).nth(i).click();
    }
  }

  async goToCart() {
    await this.page.getByRole('button', { name: /Cart \(6\)/ }).click();
  }
}
