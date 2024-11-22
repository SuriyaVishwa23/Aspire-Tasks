import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isLoggedIn: boolean = false;

    constructor(private authService:AuthService,private loginService:LoginService,private router:Router) {}
  
    ngOnInit(): void {
      this.loginService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      });
    }

    logout(): void {
        this.authService.logoutUser();
  this.router.navigate(['login']);
      }

}
