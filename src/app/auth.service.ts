import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users';
    private isLoggedIn: boolean = false;
    private userName: string = '';
    private currentUser: any = null;
    private previousUrl!: string;
  private appointmentType!: string;
  
    constructor(private http: HttpClient,private loginService: LoginService) {}
  
    login(email: string, password: string): Observable<boolean> {
      return this.http.get<any[]>(this.apiUrl).pipe(
        map(users => {
          const user = users.find(u => u.email === email && u.password === password);
          if (user) {
            this.isLoggedIn = true;
            this.userName = user.username;
            this.currentUser = user;
            this.loginService.setLoginStatus(true);
            return true;
          }
          return false;
        })
      );
    }
  
    isUserLoggedIn(): boolean {
      return this.isLoggedIn;
    }
  
    getUserName(): string {
      return this.userName;
    }
  
    isAdminUser(): boolean {
      const currentUser = this.getCurrentUser();
      return currentUser && currentUser.isAdmin;
    }
  
    getCurrentUser(): any {
      return this.currentUser;
    }
  
    logoutUser(): void {
        this.isLoggedIn = false;
        this.userName = '';
        this.currentUser = null;
        this.previousUrl = '';
        this.loginService.setLoginStatus(false);
    }
    setPreviousUrl(url: string): void {
        this.previousUrl = url;
      }
    
      getPreviousUrl(): string {
        return this.previousUrl;
      }

      getUserId(): string | undefined {
        return this.currentUser?.id; // Update to return the user ID or undefined
      }
    
      setAppointmentType(type: string): void {
        this.appointmentType = type;
      }
    
      getAppointmentType(): string {
        return this.appointmentType;
      }
}  
