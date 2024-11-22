import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loggedIn: boolean = false;
  username: string | null = '';

constructor(private router: Router) {}
ngOnInit() {
  // Check if the user is already logged in
  if (localStorage.getItem('loggedIn') === 'true') {
    this.loggedIn = true;
    this.username = localStorage.getItem('username') || '';
  }
}

logout() {
  // Clear the logged-in status and username from local storage
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('username');

  // Redirect to the login page or home page
  this.router.navigate(['/home']);
}


}
