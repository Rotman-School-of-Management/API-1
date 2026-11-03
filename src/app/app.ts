import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common'; // 1. Import from @angular/common
import {  Product, ProductService } from './services/product';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
    imports: [FormsModule, NgFor, NgIf],
  styleUrl: './app.css',
  templateUrl: './app.html',
 // 1. Set strategy to OnPush so Angular ignores default digest cycles for this component
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class App implements OnInit {
  products: Product[] = [];
 // etc1: boolean | null = null; 
  
  
  // Track form state
  currentProduct: Product = { id: 0, uxnameF: '', uxname: '', uxemail: '',etc1: '',etc2: '',};
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
            this.cdr.detectChanges();
        }
      });
    } else {
      // ADD MODE
      this.productService.addProduct(this.currentProduct).subscribe({
        next: () => {
          this.loadProducts(); // Refresh list
          this.resetForm();
            this.cdr.detectChanges();
        }
      });
    }
  }

  editProduct(product: Product): void {
    this.isEditMode = true;
    this.currentProduct = { ...product }; // Shallow copy to avoid live-binding in form
    this.cdr.markForCheck();
      this.cdr.detectChanges();
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts(); // Refresh list
            this.cdr.detectChanges();
        }
      });
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.currentProduct = { id: 0, uxnameF: '', uxname: '', uxemail: '',etc1: '',etc2: '',};
    this.cdr.markForCheck();
      this.cdr.detectChanges();
  }
}
