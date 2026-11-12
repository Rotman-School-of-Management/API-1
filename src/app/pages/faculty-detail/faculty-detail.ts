// src/app/pages/faculty-detail/faculty-detail.component.ts
import { Component, ChangeDetectorRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FacultyService } from '../../services/faculty';

@Component({
  selector: 'app-faculty-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrl: './faculty-detail.css', 
  templateUrl: './faculty-detail.html'
})
export class FacultyDetail implements OnInit {
  facultyMember: any = null;
  loading = true;
  errorMessage = '';
  private cdr = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyService
  ) { }

  ngOnInit(): void {
    const idValue = this.route.snapshot.paramMap.get('id');
    const id = Number(idValue);

    if (!idValue || !Number.isInteger(id) || id < 1) {
      this.loading = false;
      this.errorMessage = 'The faculty ID is invalid.';
      return;
    }

    this.facultyService.getFacultyById(id).subscribe(data => {
      this.facultyMember = data;
      this.cdr.detectChanges(); 
      this.loading = false;
      if (!data) {
        this.errorMessage = 'Faculty member not found.';
      }
    }, () => {
      this.loading = false;
      this.errorMessage = 'Unable to load this faculty member.';
    });
  }
}
