import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // or { NgIf }
import * as Papa from 'papaparse'; // Import Papa Parse

@Component({
  selector: 'app-page1',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './page1.html',
  styleUrl: './page1.css',
    template: `@for (row of csvData; track row.id) {
  <div>{{ row }}</div>
}`,
})
export class Page1 {
visible = true;
 csvData: any[] = [];
  headers: string[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true, // Use first row as header
        skipEmptyLines: true,
        complete: (result) => {
          this.csvData = result.data;
          this.headers = Object.keys(this.csvData[0] || {});
        },
        error: (error: any) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  }
}
