import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  uxnameF: string;
  uxname: string;
  uxemail: string;
  etc1: string;
  etc2: string;

}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // .NET API URL
  private apiUrl = 'http://localhost:5049/api/products'; //connect to InsightshubApi

  constructor(private http: HttpClient) { }
 
   getProducts(): Observable<Product[]> {
     return this.http.get<Product[]>(this.apiUrl);
   }
 
   addProduct(product: Omit<Product, 'id'>): Observable<Product> {
     return this.http.post<Product>(this.apiUrl, product);
   }
 
   updateProduct(id: number, product: Product): Observable<void> {
     return this.http.put<void>(`${this.apiUrl}/${id}`, product);
   }
 
   deleteProduct(id: number): Observable<void> {
    // return this.http.delete<void>(`${`this.apiUrl`}/${id}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
   }
 }
