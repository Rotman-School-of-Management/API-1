import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Product, ProductService } from './product.service'; 
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common'; // 1. Import from @angular/common
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-root',
   imports: [FormsModule, NgFor, NgIf, CurrencyPipe],
  styleUrl: './app.css',
  templateUrl: './app.html',
 // 1. Set strategy to OnPush so Angular ignores default digest cycles for this component
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class App implements OnInit {
  products: Product[] = [];
  
  // Track form state
  currentProduct: Product = { id: 0, name: '', price: 0, stock: 0 };
  isEditMode = false;

  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.cdr.markForCheck(); 
      }
    });
  }

  saveProduct(): void {
    if (this.isEditMode) {
      // EDIT MODE
      this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
        next: () => {
          this.loadProducts(); // Refresh list
          this.resetForm();
        }
      });
    } else {
      // ADD MODE
      this.productService.addProduct(this.currentProduct).subscribe({
        next: () => {
          this.loadProducts(); // Refresh list
          this.resetForm();
        }
      });
    }
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.currentProduct = { ...product }; // Shallow copy to avoid live-binding in form
    this.cdr.markForCheck();
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts(); // Refresh list
        }
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentProduct = { id: 0, name: '', price: 0, stock: 0 };
    this.cdr.markForCheck();
  }
}