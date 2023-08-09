import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Job } from '../jobs';
import { JobService } from '../job.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string |any;
  password: string |any;
  usertype:string |any;

  jobs: Job[]|any;

  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn

  constructor(private authService: AuthService,private router: Router,private http: HttpClient,private jobService: JobService,) { }

  onRegister() {
    const data = { username: this.username, password: this.password, usertype: this.usertype };
    this.http.post('http://localhost:3000/register', data).subscribe(
      (response: any) => {
        console.log(response);
        alert('Registration Successful!');
      },
      (error: any) => {
        console.log(error);
        alert('Registration Failed!');
      }
    );
  }


  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
