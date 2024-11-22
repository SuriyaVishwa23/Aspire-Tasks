import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-skincare',
  templateUrl: './skincare.component.html',
  styleUrls: ['./skincare.component.css']
})
export class SkincareComponent {
    constructor(private router:Router,private authService:AuthService){}
    goToAppointment(): void {
        this.router.navigate(['appointment', 'skincare']);
      }

}
