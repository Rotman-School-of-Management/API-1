import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Import the module
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import this
import { App } from './app';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,  CommonModule ,
    HttpClientModule // Add this to imports
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
