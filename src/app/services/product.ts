import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
// 1. MUST HAVE THE 'export' KEYWORD
// 2. MUST MATCH THE NAME 'ProductService' EXACTLY (Case-Sensitive)
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = 'https://dummyjson.com/products';
    getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
