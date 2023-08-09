import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: String ;
  email: String;
  subject: String ;
  message: String;




  constructor(private router: Router,private http: HttpClient) { }

  onMessage() {
    const data = { name: this.name, email: this.email, subject: this.subject, message: this.message };
    this.http.post('http://localhost:3000/contact', data).subscribe(
      (response: any) => {
        console.log(response);
        alert('Message sent Successful!');
      },
      (error: any) => {
        console.log(error);
        alert('Message sending Failed!');
      }
    );
  }





}
