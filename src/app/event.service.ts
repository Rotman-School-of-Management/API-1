import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Replace this with your actual API endpoint or local JSON file path
  private apiUrl = 'http://localhost:5113/api/message'; 

  constructor(private http: HttpClient) {}
  
    getEvents(): Observable<any> {
      // Note responseType: 'text' to handle XML raw string
      return this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
        map(xmlString => {
          let parsedData: any;
          
          // Parse XML string to JSON
          xml2js.parseString(xmlString, { explicitArray: false, mergeAttrs: true }, (err, result) => {
            if (err) {
              throw new Error('Error parsing XML');
            }
            parsedData = result;
          });
          
          // This will drill down to extract the Event array/object
          return parsedData?.Events?.Event; 
        })
      );
    }
}