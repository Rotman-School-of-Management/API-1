import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
   imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})


export class Home {
  
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize form with validators
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {

     
    if (this.userForm.valid) {
      console.log('Form Submitted!', this.userForm.value); //
    } else {
      this.userForm.markAllAsTouched(); // Trigger validation messages
    }
  }
}
