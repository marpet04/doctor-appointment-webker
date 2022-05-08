import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/shared/models/Doctor';
import { User } from 'src/app/shared/models/User';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    birthDate: new FormControl(''),
    doctor_id: new FormControl(''),
    phonenumber: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl('')
  });

  isSlideChecked: boolean = false;
  
  constructor(private authservice: AuthService, private router: Router, private userservice: UserService, private doctorservice: DoctorService) { }

  ngOnInit(): void {
  }

  registrate() {
    if (this.registrationForm.value.password === this.registrationForm.value.repassword) {
      this.authservice.registrate(this.registrationForm.value.email, this.registrationForm.value.password)
      .then(cred => {
        console.log(cred);
        if (!this.isSlideChecked) {
          const user: User = {
            id: cred.user?.uid as string,
            name: this.registrationForm.value.name,
            email: this.registrationForm.value.email,
            birthDate: this.registrationForm.value.birthDate
          }
          this.userservice.create(user)
          .then(user => {
            console.log(user);
          }).catch(err => {
            alert(err.message)
          });
        } else if (this.isSlideChecked && this.registrationForm.value.doctor_id && this.registrationForm.value.phonenumber) {
          const doctor: Doctor = {
            id: cred.user?.uid as string,
            name: this.registrationForm.value.name,
            email: this.registrationForm.value.email,
            birthDate: this.registrationForm.value.birthDate,
            doctor_id: this.registrationForm.value.doctor_id,
            phonenumber: this.registrationForm.value.phonenumber
          }
          this.doctorservice.create(doctor)
          .then(doctor => {
            console.log(doctor);
          }).catch(err => {
            alert(err.message)
          });
        } else {
          alert("Nem töltötted ki a doktorsághoz kötelező mezőket!")
        } 
        this.router.navigateByUrl('/login');
      }).catch(err => {
        alert(err.message);
      })
    } else {
      alert("A jelszó nem egyezik meg a megerősítéssel!")
    }
    
  }

  toggleChanges($event: MatSlideToggleChange) {
    this.isSlideChecked = $event.checked;
    console.log(this.isSlideChecked);
}

}
