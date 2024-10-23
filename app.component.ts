import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient , HttpClientModule} from '@angular/common/http';
import { NgIf } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Ensure the property is 'styleUrls'
})
export class AppComponent {
  title = 'ContactForm';
  responseData: any;
  error: any;
  successMessage: string | null = null; // Correctly declare successMessage

  constructor(private http: HttpClient) {} // Inject HttpClient

  // Method to handle form submission
  onSubmit(event: Event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const contactInput = document.getElementById('contact') as HTMLInputElement;
    const subInput = document.getElementById('subject') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;

    const postData = {
      name: nameInput.value,
      email: emailInput.value,
      contact: contactInput.value,
      subject: subInput.value,
      message: messageInput.value
    };

    // Send the POST request
    this.http.post('https://6717e422b910c6a6e02a778e.mockapi.io/contact/contactUs', postData)
      .pipe(
        catchError((error) => { 
          console.error('Error:', error);
          this.error = error;
          this.successMessage = null; // Clear success message on error
          return throwError(error); 
        })
      )
      .subscribe(
        (response) => {
          console.log('Response:', response);
          this.responseData = response; // Display the response in the template
          this.successMessage = 'Your message has been successfully sent!'; // Set success message
          this.resetForm(); // Reset the form
        },
        (error) => {
          console.error('Error:', error); // Handle errors
          this.error = error;
          this.successMessage = null; // Clear success message on error
        }
      );
  }

  // Method to reset the form fields
  resetForm() {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const contactInput = document.getElementById('contact') as HTMLInputElement;
    const subInput = document.getElementById('subject') as HTMLInputElement;
    const messageInput = document.getElementById('message') as HTMLTextAreaElement;

    // Clear the input fields
    nameInput.value = '';
    emailInput.value = '';
    contactInput.value = '';
    subInput.value = '';
    messageInput.value = '';

    // Optionally, you can clear any errors
    this.error = null;
  }
}
