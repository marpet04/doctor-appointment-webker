import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/models/Appointment';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  doctor_id: string = '';
  currentUser = JSON.parse(localStorage.getItem('user') as string);
  appointment: any;

  addAppointmentForm = new FormGroup({
    id: new FormControl(''),
    doctor_id: new FormControl(''),
    user_id: new FormControl(''),
    appointment: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AppointmentsComponent>, @Inject(MAT_DIALOG_DATA) data: any,
  private userService: UserService) {
    if (data.id) {
      this.appointment = data;
    } else {
      this.doctor_id = data;
    }
     
  }

  ngOnInit(): void {
    if (this.appointment) {
      this.addAppointmentForm.patchValue({
        id: this.appointment.id,
        doctor_id: this.appointment.doctor_id,
        user_id: this.appointment.user_id,
        appointment: this.appointment.appointment
      });
    } else {
      this.addAppointmentForm.patchValue({
        id: this.randomString(),
        doctor_id: this.doctor_id,
        user_id: this.currentUser.uid
      });
    }
      
    
  }

  randomString() {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for ( var i = 0; i < 5; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

}
