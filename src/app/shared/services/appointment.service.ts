import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  collectionName = 'Appointments';

  constructor(private afs: AngularFirestore) { }

  create(appointment: Appointment) {
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);
  }

  getAll() {
    return this.afs.collection<Appointment>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<Appointment>(this.collectionName).doc(id).valueChanges();
  }

  getByUserId(user_id: string) {
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where('user_id', '==', user_id)).valueChanges();
  }

  getByDoctorId(doctor_id: string) {
    return this.afs.collection<Appointment>(this.collectionName, ref => ref.where('doctor_id', '==', doctor_id)).valueChanges();
  }

  update(appointment: Appointment) {
    return this.afs.collection<Appointment>(this.collectionName).doc(appointment.id).set(appointment);
  }

  delete(id: string) {
    return this.afs.collection<Appointment>(this.collectionName).doc(id).delete();
  }
}
