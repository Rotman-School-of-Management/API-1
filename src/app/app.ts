import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { EventService } from './event.service';
import { FormsModule } from '@angular/forms'; // 1. Import it

const headers = new HttpHeaders({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});




@Component({
  selector: 'app-root',
   standalone: true,
  imports: [CommonModule, FormsModule],
   templateUrl: './app.html'
})
export class App implements OnInit {

  eventsList: any[] = [];
  private masterEventData: any[] = [];  // This keeps the original, unfiltered copy
  filteredEventsList: any[] = [];
  public searchQuery: string = ''; 
  public totalCount: number = 0; // To hold the count of filtered events

  constructor(private eventService: EventService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        // Ensure data is always treated as an array even if single item returned
        this.eventsList = Array.isArray(data) ? data : [data];
        this.masterEventData = Array.isArray(data) ? data : [data];;
        this.applyFilter(); 
      },
      error: (err) => console.error('Failed to fetch events:', err)
    });
  }
  // 2. Add a filtering method triggered by user input
  public applyFilter() {
    const query = this.searchQuery.toLowerCase().trim();

    if (!query) {
      this.eventsList = [...this.masterEventData];
    } else {
      this.eventsList = this.masterEventData.filter(event =>
        event.Name.toLowerCase().includes(query) ||
        event.Location.toLowerCase().includes(query) ||
        event.PublishType.toLowerCase().includes(query) ||
        event.Description.toLowerCase().includes(query)
      );
    }
    this.totalCount = this.eventsList.length;
    this.cdr.detectChanges();
  }
}


