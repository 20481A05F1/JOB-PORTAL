import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './jobs';
import { Profile } from './profiles';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:3000'; // base URL of your backend API

  constructor(private http: HttpClient) { }



  // Other methods for handling job-related operations (e.g., fetching jobs, creating jobs, deleting jobs) can also be defined here

  getProflie(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }



  addProfile(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiUrl, profile);
  }



}
