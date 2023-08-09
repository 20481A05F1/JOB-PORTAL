import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  usertype:string |any;
  private _isLoggedIn: boolean = false; // private backing field for isLoggedIn




   constructor() { }



  get isLoggedIn() {
    return this._isLoggedIn; // return the private backing field
  }
}
