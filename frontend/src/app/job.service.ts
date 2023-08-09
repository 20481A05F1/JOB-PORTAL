import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './jobs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:3000'; // base URL of your backend API

  constructor(private http: HttpClient) { }

  // Method for updating a job
  updateJobs(jobId: string, jobData: any): Observable<any> {
    const url = `${this.apiUrl}/jobs/${jobId}`;
    return this.http.put(url, jobData);
  }

  // Other methods for handling job-related operations (e.g., fetching jobs, creating jobs, deleting jobs) can also be defined here

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  getJob(id: number): Observable<Job> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Job>(url);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiUrl, job);
  }

  updateJob(job: Job): Observable<Job> {
    const url = `${this.apiUrl}/${job.id}`;
    return this.http.put<Job>(url, job);
  }

  deleteJob(id: number): Observable<Job> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Job>(url);
  }
}
