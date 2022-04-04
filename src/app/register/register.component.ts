import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import RegisterUser from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerUser:RegisterUser ={userName: "", password: "", password2: ""} as RegisterUser;
  warning:String="";
  success:boolean=false;
  loading:boolean=false;
  subSubscription : Subscription | undefined;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

ngOnDestroy(): void {
  this.subSubscription?.unsubscribe();
    
}

  onSubmit(): void {

    if(this.registerUser.password != "" && this.registerUser.password2 != "" && this.registerUser.userName != ""){
      this.loading = true;
    this.subSubscription=this.auth.register(this.registerUser).subscribe({
      next:(next) => {
        this.success=true;
        this.warning="";
        this.loading=false;

      },
      error: (err) => {
        this.success=false;
        this.loading=false;
        this.warning = err.error.message;
      }
    });

}
  }


}
