import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
// import jwt_decode from 'jwt-decode';
// import { Job } from "./jobs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private token: string | null;
  private _isLoggedIn = false;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this._isLoggedIn = this.token !== null;
  }

  login(username: string, password: string , usertype:string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { username, password ,usertype})
      .pipe(tap(res => {
        this.setToken(res.token);
        console.log(this.token);
        console.log(username);
        console.log(usertype);

      }));
  }



  logout(): void {
    // clear token
    this.token = null;
    localStorage.removeItem('token');
    this._isLoggedIn = false;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  getToken(): string | null {
    return this.token;
  }

  getJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs`, { headers: { Authorization: `Bearer ${this.token}` } });
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
    this._isLoggedIn = true;
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }
  // getJobs(): Observable<Job[]> {
  //   return this.http.get<Job[]>(this.apiUrl);
  // }

  // getJob(id: number): Observable<Job> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.get<Job>(url);
  // }


  // updateJob(job: Job): Observable<Job> {
  //   if (!job.id) {
  //     throw new Error('Job id is required');
  //   }
  //   const url = `${this.apiUrl}/${job.id}`;
  //   return this.http.put<Job>(url, job);
  // }


  // deleteJob(id: number): Observable<Job> {
  //   const url = `${this.apiUrl}/${id}`;
  //   return this.http.delete<Job>(url);
  // }

}
