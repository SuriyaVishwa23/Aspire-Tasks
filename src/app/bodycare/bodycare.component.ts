import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bodycare',
  templateUrl: './bodycare.component.html',
  styleUrls: ['./bodycare.component.css']
})
export class BodycareComponent {
    constructor(private router:Router,public authService:AuthService){}
    navigateToLogin(): void {
        // Redirect to the login page
        this.router.navigate(['/login']);
      }

}
