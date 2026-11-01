import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './services/product';


@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
 // 1. Set strategy to OnPush so Angular ignores default digest cycles for this component
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class App implements OnInit {
   products: any[] = [];
  errorMessage: string = '';

  
  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
         this.cdr.markForCheck(); 
      },
      error: (err) => {
        this.errorMessage = 'Failed to load products from API';
        console.error(err);
           // Notify Angular to display the error block
        this.cdr.markForCheck(); 
      }
    });
  }
}
