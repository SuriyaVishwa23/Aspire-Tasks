import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

    private apiUrl = 'http://localhost:3000/appointments'; // Replace with your JSON server API URL

    constructor(private http: HttpClient) {}
  
    submitAppointment(appointmentData: any): Observable<any> {
      return this.http.post(this.apiUrl, appointmentData);
    }
}
