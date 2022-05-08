import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DoctorService } from 'src/app/shared/services/doctor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    doctor_id: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  isSlideChecked: boolean = false;
 

  constructor(private authservice: AuthService, private router: Router, private doctorService: DoctorService) { }

  ngOnInit(): void {
  }

  login() {
    this.authservice.login(this.loginForm.value.email, this.loginForm.value.password)
    .then(cred => {
      console.log(cred);
      if (!this.isSlideChecked) {
        localStorage.setItem('role', 'patient');
      } else if (this.isSlideChecked && this.loginForm.value.doctor_id) {
        localStorage.setItem('role', 'doctor');
      } else {
        alert("Nem töltötted ki az orvosnak kötelező mezőket!");
      }
      this.router.navigateByUrl('/home');
    }).catch(err => {
      alert(err.message);
    })
  }

  
  toggleChanges($event: MatSlideToggleChange) {
    this.isSlideChecked = $event.checked;
    console.log(this.isSlideChecked);
}

  

}
