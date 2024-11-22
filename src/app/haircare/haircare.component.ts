import { Component } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuard } from '../auth.guard';

@Component({
  selector: 'app-haircare',
  templateUrl: './haircare.component.html',
  styleUrls: ['./haircare.component.css']
})
export class HaircareComponent {

  constructor(private router:Router,public authService:AuthService){}
  goToAppointment(): void {
    this.router.navigate(['appointment', 'haircare']);
  }
  
}
