import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../services/product';
import { QuoteService } from '../services/quote';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataService } from '../data';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-quotes',
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes implements OnInit {

  private dataService = inject(DataService);
  private cdr = inject(ChangeDetectorRef);

  // Properties to hold your data
  products: any[] = [];
  cartItems: any[] = [];
  cartTotal: number = 0;
  posts: any[] = [];
  quotes: any[] = [];
  isLoading = true;
  filteredProducts: any[] = [];
  filteredPosts: any[] = [];
  filteredQuotes: any[] = [];
  searchTerm: string = '';
  searchPostTerm: string = '';
  searchQuoteTerm: string = '';

  constructor(private productService: DataService, public cartService: CartService) { }


  ngOnInit() {
    // Fetch all data at once when the component initializes
    this.dataService.getAllData().subscribe({
      next: (response) => {
        this.products = response.products.products; // DummyJSON nests lists inside an object
        this.filteredProducts = [...this.products];  // loading all productss into filteredProducts initially
        this.posts = response.posts.posts;
        this.filteredPosts = [...this.posts];  // loading all posts into filteredPosts initially
        this.quotes = response.quotes.quotes;
        this.filteredQuotes = [...this.quotes];// loading all quotes into filteredQuotes initially
        this.isLoading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Error fetching DummyJSON data:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });

  }
  // Helper to load items from LocalStorage safely
  loadCart() {
    const savedCart = localStorage.getItem('cart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
  }

  // Helper to stringify and save data to LocalStorage
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // 1. ADD TO CART (or increase quantity if it already exists)
  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail
      });
    }
    this.saveCart();
  }

  // 2. EDIT QUANTITY (Directly or via +/- buttons)
  updateQuantity(productId: number, change: number) {
    const item = this.cartItems.find(item => item.id === productId);
    if (item) {
      item.quantity += change;

      // If quantity drops to 0 or less, remove it automatically
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
        return;
      }
      this.saveCart();
    }
  }

  // 3. REMOVE FROM CART
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.saveCart();
  }

  // Optional: Calculate Grand Total
  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }


  // Filter logic executed on every keystroke
  filterProducts(): void {
    const queryP = this.searchTerm.toLowerCase().trim();


    if(!queryP) {
      this.filteredProducts = [...this.products];
      return;
    }

    // Filter by title or description matching search criteria
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(queryP) ||
      product.description.toLowerCase().includes(queryP)
    );

  }


  filterPosts() {
    const query = this.searchPostTerm.toLowerCase().trim();


    if (!query) {
      this.filteredPosts = [...this.posts];
      return;
    }

    // Filter by title matching search criteria
    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    );
  }



  filterQuotes() {
    const queryQ = this.searchQuoteTerm.toLowerCase().trim();


    if (!queryQ) {
      this.filteredQuotes = [...this.quotes];
      return;
    }

    // Filter by title matching search criteria
    this.filteredQuotes = this.quotes.filter(quote =>
      quote.quote.toLowerCase().includes(queryQ) ||
      quote.author.toLowerCase().includes(queryQ)
    );
  }



}

