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
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  // Observable for components to subscribe to
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // Load cart from localStorage
  private loadCart() {
    const savedCart = localStorage.getItem('shopping_cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Save cart to localStorage
  private saveCart() {
    localStorage.setItem('shopping_cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  // Add item or increase quantity if it exists
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

  // Update quantity (Edit)
  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.saveCart();
      }
    }
  }

  // Remove item
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
  }

  // Clear entire cart
  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }
}
