import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppointmentService } from '../appointment.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent {


  careType!: string;
  problems: string[] = [];
  showNextStep: boolean = false;
  age: number = 0;
  selectedDoctor: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  selectedProblems: { [key: string]: boolean } = {};
  previousUrl: string = '/type';
  doctors: string[] = ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams'];


  appointmentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appointmentService:AppointmentService,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.previousNavigation && navigation.previousNavigation.finalUrl) {
      this.previousUrl = navigation.previousNavigation.finalUrl.toString();
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.careType = params.get('type') ?? '';
      this.problems = this.getProblemsByCareType(this.careType);
    });
    this.appointmentForm = this.formBuilder.group({
        selectedDoctor: ['', Validators.required],
        selectedDate: ['', [Validators.required, this.validateDateRange.bind(this)]],
        selectedAge: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
        selectedTime: ['', [Validators.required, Validators.pattern('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'), this.validateTimeRange.bind(this)]]
      });
      
  }

  validateDateRange(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      return { invalidDateRange: true };
    }

    return null;
  }

  validateTimeRange(control: AbstractControl): ValidationErrors | null {
    const selectedTime = control.value;
    const startTime = '09:00';
    const endTime = '22:00';

    if (selectedTime < startTime || selectedTime > endTime) {
      return { invalidTimeRange: true };
    }

    return null;
  }

  getProblemsByCareType(careType: string): string[] {
    if (careType === 'haircare') {
      return ['Hair Loss', 'Dandruff', 'Dry Scalp'];
    } else if (careType === 'skincare') {
      return ['Acne', 'Dry Skin', 'Wrinkles'];
    } else {
      return [];
    }
  }

  goToNextStep() {
    this.showNextStep = true;
  }
  goBack() {
    this.router.navigateByUrl(this.previousUrl);
  }

  submitAppointment() {
    const appointmentData = {
        userName: this.authService.getUserName(),
        age: this.appointmentForm.value.selectedAge,
        doctor: this.appointmentForm.value.selectedDoctor,
        date: this.appointmentForm.value.selectedDate,
        time: this.appointmentForm.value.selectedTime,
        problems: this.selectedProblems,
      
    };

    this.appointmentService.submitAppointment(appointmentData)
      .subscribe(
        response => {
          console.log('Appointment submitted successfully!');
          // Navigate to success page or perform any other necessary actions
        },
        error => {
          console.error('Error submitting appointment:', error);
          // Display error message or perform any other necessary actions
        }
      );
  }

  

}
