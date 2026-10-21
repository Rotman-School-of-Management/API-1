// cart.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  constructor() {}

  addToCart(product: any) {
    // Check if product already exists in cart
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }
}
