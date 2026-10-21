import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Title } from '@angular/platform-browser';  
interface ComponentType {
  // other existing properties
  onFileChange: (event: Event) => void; // Add the missing property
}

const onFileChange = (event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  const files = inputElement.files;
  // ... use the files
};

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
 pageTitle = 'My Application Page Title'; 
  pageHeading = 'About Us';
   csvData: any; // Declare the property
   headers: any; // Declare the property
 
  constructor(private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.pageTitle);
  }
public onFileChange(event: Event): void { // Declare the method
    const inputElement = event.target as HTMLInputElement; // Use type assertion
    if (inputElement.files && inputElement.files.length > 0) {
      // Handle the files here
      console.log('Files selected:', inputElement.files);
    }
  }

}

