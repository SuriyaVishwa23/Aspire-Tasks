import { HttpClient } from '@angular/common/http';

import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
    emailPattern = '^[A-Za-z0-9._-]+@[A-Za-z0-9.]+\.[a-z]{2,4}$';
  hide = true;
  retUrl: string = 'home';
  errorMessage: string = '';
  appointmentType: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  loginForm = this.fb.group({
    email: [, [Validators.required, Validators.pattern(this.emailPattern)]],
    password: [, [Validators.required]]
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
        const retUrl = params.get('retUrl');
        this.retUrl = retUrl !== null ? retUrl : 'home';
        
    });
    
  }

  onLogin(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
  
    if (email && password) {
      this.authService.login(email, password).subscribe(
        success => {
          if (success) {
            if (this.authService.isAdminUser()) {
              alert('Admin Login Success');
              this.router.navigate(['admindashboard']);
            } else {
              alert('User Login Success');
              
              this.router.navigate([this.retUrl]);
              
            }
            this.loginForm.reset();
          } else {
            alert('Invalid email or password');
          }
        },
        error => {
          this.errorMessage = 'An error occurred while logging in';
        }
      );
    } else {
      this.errorMessage = 'Please enter email and password';
    }
  }
  

}