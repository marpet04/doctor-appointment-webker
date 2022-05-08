import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Appointment } from 'src/app/shared/models/Appointment';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { AppointmentsComponent } from '../doctors/appointments/appointments.component';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss']
})
export class MyAppointmentsComponent implements OnInit {

  appointments: Array<Appointment> = [];
  displayedColumns: string[] = ['doctor_id', 'user_id', 'appointment', 'actions'];
  currentUser = JSON.parse(localStorage.getItem('user') as string);
  role = localStorage.getItem('role') as string;
  profile: any;

  constructor(private appointmentService: AppointmentService, private doctorService: DoctorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.role == 'patient') {
      this.appointmentService.getByUserId(this.currentUser.uid).subscribe(apps => {
        this.appointments = apps;
      });
    } else if (this.role == 'doctor') {
      let doctor_id: string = '';
      this.doctorService.getById(this.currentUser.uid).subscribe(doc => {
        doctor_id = doc?.doctor_id as string;
        this.appointmentService.getByDoctorId(doctor_id).subscribe(apps => {
          this.appointments = apps;
        });
      });
    }
  }

  delete(id: string) {
    this.appointmentService.delete(id);
  }

  openDialog(appointment: Appointment): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = appointment;
    const dialogRef = this.dialog.open(AppointmentsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((app: Appointment) => {
      console.log(app);
      this.appointmentService.update(app);
    }, err => {
      console.warn(err);
    });
  }

}
