// src/app/pages/faculty-detail/faculty-detail.component.ts
import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FacultyService } from '../../services/faculty';

@Component({
  selector: 'app-faculty-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './faculty-detail.html'
})
export class FacultyDetail implements OnInit {
  facultyMember: any = null;
  private cdr = inject(ChangeDetectorRef);
  constructor(
    private route: ActivatedRoute,
    private facultyService: FacultyService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.facultyService.getFacultyById(id).subscribe(data => {
      this.facultyMember = data;
      this.cdr.detectChanges(); 
    });
  }
}
