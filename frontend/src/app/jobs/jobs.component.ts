import { Component } from '@angular/core';
import { Job } from '../jobs';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JobService } from '../job.service';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  username: string |any;
  password: string |any;
  usertype:string |any;
  // filteredJobs:string;
  positionFilter: string = "";
  locationFilter: string = "";

  positionAndLocationFilter = (job: Job[]|any) => job.title.toLowerCase().includes(this.positionFilter.toLowerCase()) && job.location.toLowerCase().includes(this.locationFilter.toLowerCase());


  jobs: Job[]|any;

  showLoginForm = false;
  showJobForm = false;
  showRegisterForm =false;



  ngOnInit() {
    this.usertype = localStorage.getItem('usertype');
    this.username = localStorage.getItem('username');
    this.password = localStorage.getItem('password');


  }
  // filterJobs() {
  //   this.filteredJobs = this.jobs.filter((job: Job) => {
  //     return job.title.toLowerCase().includes(this.positionFilter.toLowerCase());
  //   });
  // }

  // filterJobsbylocation() {
  //   this.filteredJobs = this.jobs.filter((job: Job) => {
  //     return job.location.toLowerCase().includes(this.locationFilter.toLowerCase());
  //   });
  // }





  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }


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


  logout(): Observable<any> {

    this.authService.clearToken();
    this._isLoggedIn = false;
    window.location.replace('/');
    return new Observable(observer => {
      observer.complete();

    });

  }




  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
