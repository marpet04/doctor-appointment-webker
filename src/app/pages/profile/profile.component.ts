import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser = JSON.parse(localStorage.getItem('user') as string);
  role = localStorage.getItem('role') as string;
  profile: any;

  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    doctor_id: new FormControl(''),
    phonenumber: new FormControl('')
  });


  constructor(private authService: AuthService, private doctorService: DoctorService,
    private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.currentUser.uid);
    if (this.role == 'patient') {
      this.userService.getById(this.currentUser.uid).subscribe(user => {
        this.profile = user;
        this.profileForm.patchValue({
          id: this.currentUser.uid,
          name: this.profile.name,
          email: this.profile.email,
          birthDate: this.profile.birthDate
        });
      });
    } else if (this.role == 'doctor') {
      this.doctorService.getById(this.currentUser.uid).subscribe(user => {
        this.profile = user;
        this.profileForm.patchValue({
          id: this.currentUser.uid,
          name: this.profile.name,
          email: this.profile.email,
          birthDate: this.profile.birthDate,
          doctor_id: this.profile.doctor_id,
          phonenumber: this.profile.phonenumber
        });
      });
    }
  }



}
