import { Component, OnInit } from '@angular/core';
import { Faculty } from './service/faculty';
import { FacFaculty } from './models/faculty.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule], // Add it here
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  facultyList: FacFaculty[] = [];
  errorMessage: string = '';

  constructor(private facultyService: Faculty) {}

  ngOnInit(): void {
    this.facultyService.getFaculties().subscribe({
      next: (data) => {
        this.facultyList = data;
        console.log('Data found:', this.facultyList);
      },
      error: (err) => {
        this.errorMessage = 'Could not load data records.';
        console.error(err);
      }
    });
  }
}
