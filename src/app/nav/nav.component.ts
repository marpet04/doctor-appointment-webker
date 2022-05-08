import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/User';
import { AuthService } from '../shared/services/auth.service';
import { DoctorService } from '../shared/services/doctor.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnChanges {

  role = localStorage.getItem('role');
  currentUserName: string = '';
  user?: User;

  constructor(private authservice: AuthService, private router: Router, private doctorService: DoctorService,
    private userService: UserService) { 
    }

  ngOnInit(): void {
    /*const currentUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(currentUser.uid).subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.currentUserName = data?.name as string;
    }, error => {
      console.error(error);
    });*/
  }

  ngOnChanges(): void {
    /*const currentUser = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(currentUser.uid).subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.currentUserName = data?.name as string;
    }, error => {
      console.error(error);
    });*/
  }

  logout() {
    this.authservice.logout()
    .then(() => {
      alert("Sikeres kijelentkezés!");
      localStorage.removeItem('role');
      this.router.navigateByUrl("/login");
    }).catch(err => {
      alert(err.message);
    })
  }

}
