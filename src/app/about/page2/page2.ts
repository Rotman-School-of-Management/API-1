import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-page2',
 imports: [ReactiveFormsModule], // Add it here
  templateUrl: './page2.html',
  styleUrl: './page2.css',
   
})
export class Page2 {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize EmailJS with your Public Key
    emailjs.init('YOUR_PUBLIC_KEY'); //
    
    this.contactForm = this.fb.group({
      user_name: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  public sendEmail(e: Event) {
    e.preventDefault(); // Prevent default form submission

    if (this.contactForm.valid) {
      emailjs
        .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, {
          publicKey: 'YOUR_PUBLIC_KEY',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            alert('Email sent successfully!');
            this.contactForm.reset(); // Reset form after success
          },
          (error) => {
            console.log('FAILED...', (error as EmailJSResponseStatus).text);
            alert('Email failed to send.');
          }
        );
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}