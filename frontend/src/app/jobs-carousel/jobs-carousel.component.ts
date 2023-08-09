import { Component } from '@angular/core';
import { Job } from '../jobs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JobService } from '../job.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs-carousel',
  templateUrl: './jobs-carousel.component.html',
  styleUrls: ['./jobs-carousel.component.css']
})
export class JobsCarouselComponent {
  // img1="https://source.unsplash.com/random/1920x1080/?datascience";
  // img2="https://source.unsplash.com/random/1920x1080/?webdeveloper";
  // jobs:Job[]|any;
  // private _isLoggedIn: boolean = false; // private backing field for isLoggedIn
  // constructor(private authService: AuthService,private router: Router,private http: HttpClient,private jobService: JobService,) {
  //   if (this.authService.isLoggedIn()) {
  //     this._isLoggedIn = true;
  //     this.authService.getJobs().subscribe(
  //       (jobs) => {
  //         this.jobs = jobs;

  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }
  jobs = [
    {
      title: 'Marketing Manager',
      description: "We're seeking a skilled Marketing Manager to oversee all marketing initiatives for our company. You'll be responsible for developing and executing marketing campaigns, managing our social media presence, and analyzing the effectiveness of our marketing efforts.",
      image: 'https://source.unsplash.com/random/1920x1080/?marketing',
      buttonText: 'Apply Now'
    },
    {
      title: 'Software Engineer',
      description: "We're looking for a talented Software Engineer to join our team. You'll be responsible for designing, developing, and maintaining our software applications, as well as working closely with our product team to ensure our products meet our customers' needs.",
      image: 'https://source.unsplash.com/random/1920x1080/?webdeveloper',
      buttonText: 'Apply Now'
    },
    {
      title: 'Data Analyst',
      description: "We're seeking a talented Data Analyst to join our team. You'll be responsible for collecting, analyzing, and interpreting large data sets to help drive key business decisions and improve our overall performance.",
      image: 'https://source.unsplash.com/random/1920x1080/?data',
      buttonText: 'Apply Now'
    },
    {
      title: 'Data Scientist',
      description: "We're seeking a talented Data Scientist to join our team. You'll be responsible for gathering and analyzing complex data using advanced statistical and machine learning techniques to help drive business decisions and develop predictive models.",
      image: 'https://source.unsplash.com/random/1920x1080/?datascience',
      buttonText: 'Apply Now'
    },
    {
      title: 'Machine Learning Engineer',
      description: "Looking for a Machine Learning Engineer to develop, train, and deploy models to solve business problems. Expertise in advanced statistical and machine learning techniques, as well as programming proficiency in languages such as Python or R, is required.",
      image: 'https://source.unsplash.com/random/1920x1080/?machinelearning',
      buttonText: 'Apply Now'
    },
    {
      title: 'Business Analyst',
      description: "We're seeking a talented Business Analyst to join our team. You'll be responsible for collecting and analyzing data, as well as non-data factors such as market trends and customer behavior, to help drive informed business decisions.",
      image: 'https://source.unsplash.com/random/1920x1080/?business',
      buttonText: 'Apply Now'
    },
    {
      title: 'Job 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://via.placeholder.com/400x200',
      buttonText: 'Apply Now'
    }
  ];

  // get isLoggedIn() {
  //   return this._isLoggedIn; // return the private backing field
  // }
}
