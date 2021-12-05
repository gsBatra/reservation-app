import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationList!: AngularFireList<any>; 

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  form: FormGroup = new FormGroup ({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    table: new FormControl(1, Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl(1, Validators.required),
    code: new FormControl(''),
    stamp: new FormControl(''),
  });

  initFormGroup() {
    this.form.setValue ({
      $key: null,
      name: '',
      email: '',
      phone: '',
      table: 1,
      date: '',
      time: 1,
      code: '',
      stamp: '',
    });
  }

  populateForm(reservation: any){
    this.form.setValue(reservation);
    this.form.patchValue({
      date: new Date(reservation.date),
    })
  }

  getReservationByCode(code: string){
    this.reservationList = this.firebase.list('reservations', ref => ref.orderByChild("code").equalTo(code));
    return this.reservationList.snapshotChanges();
  }

  getReservations() {
    this.reservationList = this.firebase.list('reservations');
    return this.reservationList.snapshotChanges();
  }

  getReservationByStamp(stamp: string) {
    this.reservationList = this.firebase.list('reservations', ref => ref.orderByChild("stamp").equalTo(stamp));
    return this.reservationList.snapshotChanges();
  }

  insertReservation(reservation: any) {
    this.reservationList.push({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      table: reservation.table,
      date: reservation.date == "" ? "" : this.datePipe.transform(reservation.date, 'MM/dd/yyyy'),
      time: reservation.time,
      code: this.getUniqueCode(4),
      stamp: reservation.date == "" ? "" : this.datePipe.transform(reservation.date, 'MM/dd/yyyy') + " " 
      + reservation.time + " " + reservation.table,
    });
  }

  updateReservation(reservation: any) {
    this.reservationList.update(reservation.$key, {
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      table: reservation.table,
      date: reservation.date == "" ? "" : this.datePipe.transform(reservation.date, 'MM/dd/yyyy'),
      time: reservation.time,
      code: reservation.code,
      stamp: reservation.date == "" ? "" : this.datePipe.transform(reservation.date, 'MM/dd/yyyy') + " " 
      + reservation.time + " " + reservation.table,
    });
  }

  deleteReservation($key: string) {
    this.reservationList.remove($key);
  }

  getUniqueCode(length: number) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }
}
