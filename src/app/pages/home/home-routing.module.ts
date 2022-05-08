import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent ,
  children: [
    {
      path: 'profile',
      loadChildren: () => import('./../profile/profile.module').then(m => m.ProfileModule)
    },
    {
      path: 'my-appointments',
      loadChildren: () => import('./../my-appointments/my-appointments.module').then(m => m.MyAppointmentsModule),
    },
    {
      path: 'doctors',
      loadChildren: () => import('./../doctors/doctors.module').then(m => m.DoctorsModule),
    },
    {
      path: '', redirectTo: 'doctors', pathMatch: 'full'
    }
]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
