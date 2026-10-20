import { Injectable, inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// 1. MUST HAVE THE 'export' KEYWORD
// 2. MUST MATCH THE NAME 'QuoteService' EXACTLY (Case-Sensitive)

export class QuoteService {
    private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/quotes/';
  getQuotes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
