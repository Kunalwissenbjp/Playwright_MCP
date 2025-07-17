import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async verifyCartItemsAndTotal() {
    const cartItems = [
      'Football - ₹500 × 1 = ₹500',
      'Cricket Bat - ₹1200 × 1 = ₹1200',
      'Tennis Racket - ₹800 × 1 = ₹800',
      'Basketball - ₹600 × 1 = ₹600',
      'Badminton Shuttle - ₹200 × 1 = ₹200',
      'Gym Gloves - ₹300 × 1 = ₹300',
    ];
    for (const item of cartItems) {
      await expect(this.page.getByText(item)).toBeVisible();
    }
    await expect(this.page.getByText('Total Price: ₹3600')).toBeVisible();
  }
}
