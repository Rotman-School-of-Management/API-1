import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: false,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  products: any[] = [];
  rawJsonString: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.rawJsonString = JSON.stringify(data, null, 2); // Convert response object array back to plain text JSON string
      },
      error: (err) => console.error('Error fetching data:', err)
    });
  }
}