import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class Cart {
  private cartItems: CartItem[] = [];
  // BehaviorSubject emits the current cart state to any subscriber components
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // Load cart from LocalStorage on initialization
  private loadCart() {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Save current cart state to LocalStorage
  private saveCart() {
    localStorage.setItem('shopping_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  // Add product to cart or increase quantity if it already exists
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1
      });
    }
    this.saveCart();
  }

  // Remove an item entirely from the cart
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
  }

  // Clear everything
  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  // Get total price of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
