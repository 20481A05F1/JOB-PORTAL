import { Component } from '@angular/core';
import { Job } from '../jobs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JobService } from '../job.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string |any;
  password: string |any;
  usertype:string |any;

  jobs: Job[]|any;

  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn


  constructor(private authService: AuthService,private router: Router,private http: HttpClient,private jobService: JobService,) {
    if (this.authService.isLoggedIn()) {
      this._isLoggedIn = true;
      this.authService.getJobs().subscribe(
        (jobs) => {
          this.jobs = jobs;

        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  login() {

    console.log(this.username);
    console.log(this.usertype);
    console.log(this.password);
    this.authService.login(this.username, this.password, this.usertype).subscribe(
      (response: any) => {
        // set token received from server
        this.authService.setToken(response.token);
        localStorage.setItem('usertype', this.usertype); // store usertype in localStorage
        localStorage.setItem('password', this.password); // store usertype in localStorage
        localStorage.setItem('username', this.username); // store usertype in localStorage
        this._isLoggedIn = true; // modify the private backing field
        this.authService.getJobs().subscribe(
          (jobs) => {this.jobs = jobs;},
          (error) => {console.log(error);}
        );
        // window.location.reload();
        alert(`Welcome to Jobportal ${this.username}!`);
        location.href = "/";
        // this.router.navigate(['/']); // navigate to the jobs page



      },
      (error) => {
        this.router.navigate(['/login']);
        console.log(error);
        alert('Invalid Username or Password or Usertype Failed! ');
      }
    );
  }


  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
