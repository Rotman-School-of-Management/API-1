import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyService } from './service/faculty';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Add it here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App  implements OnInit {
  faculty: any = null;

  constructor(private facultyService: FacultyService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.facultyService.getFacultyData().subscribe({
      next: (data) => {
        this.faculty = data;
          this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching XML data', err);
      }
    });
  }
}