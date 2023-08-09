
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.css']
})
export class CreatejobComponent {


  constructor(private http: HttpClient,private mlocation: Location,private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this._isLoggedIn = true;
    }
   }
  showJobForm = false;
  experienceneeded:string|any;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn

  jobForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    applylink: new FormControl(''), // add applyLink FormControl with empty initial value
    company: new FormControl('', Validators.required), // add applyLink FormControl with empty initial value
    jobtype: new FormControl('', Validators.required), // add applyLink FormControl with empty initial value
    experience: new FormControl('', Validators.required) // add applyLink FormControl with empty initial value
  });


  onSubmit() {
    const newJob = {
      title: this.jobForm.value.title,
      description: this.jobForm.value.description,
      location: this.jobForm.value.location,
      salary: this.jobForm.value.salary,
      applyLink: this.jobForm.value.applylink,
      company:this.jobForm.value.company,
      jobtype:this.jobForm.value.jobtype,
      experience:this.jobForm.value.experience,
    };
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Error posting job: user not authenticated');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body = this.jobForm.value;

    this.http.post('http://localhost:3000/jobs', body, { headers }).subscribe(
      (response) => {
        console.log('Job posted successfully:', response);
        alert("Job Posted Successfully!")
        this.jobForm.reset();
      },
      (error) => {
        console.error('Error posting job:', error);
      }
    );
  }


  get title() {
    return this.jobForm.get('title');
  }

  get description() {
    return this.jobForm.get('description');
  }

  get location() {
    return this.jobForm.get('location');
  }

  get salary() {
    return this.jobForm.get('salary');
  }

  get company() {
    return this.jobForm.get('company');
  }
  get jobtype() {
    return this.jobForm.get('jobtype');
  }
  get experience() {
    return this.jobForm.get('experience');
  }

  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }



  goBack() {
    this.mlocation.back();
    console.log('clicked')
    this.router.navigate(['/']);
  }
}
