import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    
 

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
        const isLoggedIn = this.authService.isUserLoggedIn();
        const returnUrl = state.url;
    
        if (!isLoggedIn) {
          // Not logged in, store the return URL
          alert("You are not logged in to view the page");
          this.authService.setPreviousUrl(returnUrl);
          this.router.navigate(['login']);
          return false;
        }
    
        // Logged in, allow navigation
        return true;
      }
    }
