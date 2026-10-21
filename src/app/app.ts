import { Component, signal, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Navbar } from './navbar/navbar';
import { Title } from './title';
import { routes } from './app.routes';
import { DataService } from './data'; 


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App {
  pageTitle: string = '';

  

  constructor(private titleService: Title) {
  this.titleService.setTitle('New Page Title'); // Call this when component loads
} 


  
}
