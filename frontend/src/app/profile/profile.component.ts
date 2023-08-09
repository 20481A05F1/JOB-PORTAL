import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { Profile } from '../profiles';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  fullname: string;
  location: string;
  email: string;
  phonenumber: string;
  totalexperience: number;
  resume: File;

  profile: Profile[] | any;

  private isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private mlocation: Location
  ) {}

  onSubmit(): void {
    const data = {
      fullname: this.fullname,
      location: this.location,
      email: this.email,
      phonenumber: this.phonenumber,
      totalexperience: this.totalexperience,
      resume: this.resume
    };
    this.http.post('http://localhost:3000/profile', data).subscribe(
      (response: any) => {
        console.log(response);
        alert('Profile created successfully!');
      },
      (error: any) => {
        console.log(error);
        alert('Failed to create profile.');
      }
    );
  }

  goBack(): void {
    this.mlocation.back();
    console.log('Clicked');
    this.router.navigate(['/']);
  }

  // updateLabel(input: HTMLInputElement): void {
  //   const label = input.nextElementSibling as HTMLLabelElement;
  //   const file = input.files?.[0];
  //   if (file) {
  //     label.innerText = file.name;
  //     this.resume = file;
  //   } else {
  //     input.value = '';
  //   }
  // }

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
