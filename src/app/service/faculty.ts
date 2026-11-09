import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FacFaculty } from '../models/faculty.model';

@Injectable({
  providedIn: 'root'
})
export class Faculty {
  private apiUrl = 'http://localhost:5115/api/faculty'; // Replace with your exact .NET Localhost IIS/Kestrel Port

  constructor(private http: HttpClient) { }

  getFaculties(): Observable<FacFaculty[]> {
    return this.http.get<FacFaculty[]>(this.apiUrl);
  }
}
