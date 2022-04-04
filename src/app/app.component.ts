/********************************************************************************* 
 * WEB422 – Assignment 06 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * assignment has been copied manually or electronically from any other source (including web sites) or 
 * distributed to other students. 
 * 
 * Name: ___JENISH RAJNIKANT PATEL____ Student ID: __131733206___ Date: _04-04-2022__
*
* Angular App (Deployed) Link: ____https://spotify-music-app-ruby.vercel.app/login__________
*
* User API (Heroku) Link: __________https://cryptic-beach-00828.herokuapp.com/______________ 
* 
********************************************************************************/

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, OnDestroy{
  title = 'web422-a6';
  searchString:String="";
  token:any;

  rouSubscription:Subscription | undefined;

constructor( private router: Router,private auth:AuthService ){}

ngOnInit() {
 this.rouSubscription= this.router.events.subscribe({ // be informed of any route changes
    next: (event:Event)=>{
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    }
  })
}

ngOnDestroy(): void {
    this.rouSubscription?.unsubscribe();
}

logout(){


  localStorage.clear();
  this.router.navigate(['/login']);
}

handleSearch(){
  this.router.navigate(["/search"], { queryParams: {q: this.searchString}});
  this.searchString="";
}


}
