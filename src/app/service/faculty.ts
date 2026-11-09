import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiUrl = 'http://localhost:5115/api/faculty-publications'; // Replace with your exact .NET Localhost IIS/Kestrel Port

 constructor(private http: HttpClient) {}

  getFacultyData(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
      map(xmlString => this.parseFacultyXml(xmlString))
    );
  }

  private parseFacultyXml(xmlString: string): any {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    
    // Extract Faculty details
    const facultyNode = xmlDoc.getElementsByTagName('Faculty')[0];
    if (!facultyNode) return null;

    const id = facultyNode.getAttribute('Id');
    const facultyId = xmlDoc.getElementsByTagName('FacultyID')[0]?.textContent || '';
    const lastName = xmlDoc.getElementsByTagName('LastName')[0]?.textContent?.trim() || '';
    const division = xmlDoc.getElementsByTagName('Division')[0]?.textContent || '';

    // Extract Publications
    const publications: any[] = [];
    const pubNodes = xmlDoc.getElementsByTagName('Publication');
    
    for (let i = 0; i < pubNodes.length; i++) {
      const title = pubNodes[i].getElementsByTagName('Title')[0]?.textContent || '';
      const year = pubNodes[i].getElementsByTagName('YearPublished')[0]?.textContent || '';
      publications.push({ title, year });
    }

    return {
      id,
      facultyId,
      lastName,
      division,
      publications
    };
  }
}