import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  usernamepattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{5,}";
  mobilepattern="[0-9]{10}"
  passwordpattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$@&*#]).{8,}"
  formBuilder: any;

  constructor(private fb:FormBuilder, private http:HttpClient,private router:Router){}

  signupForm=this.fb.group({
    username:[,[Validators.required, Validators.pattern(this.usernamepattern)]],
    email:[,[Validators.required, Validators.pattern(this.emailPattern)]],
    mobilenumber:[,[Validators.required, Validators.pattern(this.mobilepattern)]],
    password:[,[Validators.required, Validators.pattern(this.passwordpattern)]],
    cpassword:[,[Validators.required]]
  })



  signup(){
    this.http.post<any>("http://localhost:3000/users",this.signupForm.value)
    .subscribe(res=>{
      alert("Signup Successfull");
      this.signupForm.reset();
      this.router.navigate(['login']);
    })
  }


}
