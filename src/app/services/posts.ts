import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 1. Define the structural interfaces
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
}

export interface DummyJSONPostResponse {
  posts: Post[]; // The actual array you need
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/posts';

  getPosts(): Observable<Post[]> {
    return this.http.get<DummyJSONPostResponse>(this.apiUrl).pipe(
      // 2. Extract only the 'posts' array from the envelope
      map(response => response.posts) 
    );
  }
}
