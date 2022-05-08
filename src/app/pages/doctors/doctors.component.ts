import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/models/Appointment';
import { Doctor } from 'src/app/shared/models/Doctor';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AppointmentsComponent } from './appointments/appointments.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  appointments: Array<Appointment> = [];
  displayedColumns: string[] = ['doctor_id', 'user_id', 'appointment', 'actions'];
  doctors: Array<Doctor> = [];
  role = localStorage.getItem('role') as string;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.appointmentService.getAll().subscribe(appointments => {
      this.appointments = appointments;
    });
    this.doctorService.getAll().subscribe(doctors => {
      this.doctors = doctors;
    });
  }

  openDialog(doctor_id: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = doctor_id;
    const dialogRef = this.dialog.open(AppointmentsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((appointment: Appointment) => {
      console.log(appointment);
      this.appointmentService.create(appointment);
    }, err => {
      console.warn(err);
    });
  }

}
