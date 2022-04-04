import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  user:User = {userName: "", password: "", _id: ""} as User;
  warning:String ="";
  loading:boolean=false;
  logSubscription : Subscription | undefined;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
      this.logSubscription?.unsubscribe();
  }

  onSubmit(): void {

    if(this.user.password != "" && this.user.userName != ""){
      this.loading = true;
    this.logSubscription=this.auth.login(this.user).subscribe({
      next:(success) => {
        localStorage.setItem('access_token', success.token);
        this.router.navigate(['/newReleases']);
        this.loading=false;

      },
      error: (err) => {
        this.loading=false;
        this.warning = err.error.message;
      }
    });

}
  }

}
