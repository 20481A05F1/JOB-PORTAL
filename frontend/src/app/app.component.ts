import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Job } from './jobs';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 5000, noPause: true } }
  ]
})
export class AppComponent  {
  title = 'jportal';

  username: string |any;
  password: string |any;
  usertype:string |any;

  jobs:Job[];

  isLoggedIn: boolean; // private backing field for isLoggedIn

  constructor(private authService: AuthService, private router:Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logout(): Observable<any> {
    this.authService.clearToken();
    this.isLoggedIn = false;
    location.reload();
    return new Observable(observer => {
      observer.complete();
    });
  }
}
