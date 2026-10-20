import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private http = inject(HttpClient);
  private baseUrl = 'https://dummyjson.com';

  // 1. Fetch Products
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  // 2. Fetch Posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  // 3. Fetch Quotes
  getQuotes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/quotes`);
  }

  // Optional: Fetch all three simultaneously using forkJoin
  getAllData(): Observable<any> {
    return forkJoin({
      products: this.getProducts(),
      posts: this.getPosts(),
      quotes: this.getQuotes()
    });
  }
}
