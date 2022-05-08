import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsComponent } from './doctors.component';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { AppointmentsComponent } from './appointments/appointments.component';



@NgModule({
  declarations: [
    DoctorsComponent,
    AppointmentsComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule
  ]
})
export class DoctorsModule { }
