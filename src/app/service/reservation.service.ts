import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reservation } from '../Reservation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // private BASE_URL = "";
  reservationList!: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  // getReservations(): Observable<Reservation[]> {
  //   return this.http.get<Reservation[]>(`${this.BASE_URL}/reservations`);
  // }

  // getReservation(code: string): Observable<Reservation[]> {
  //   return this.http.get<Reservation[]>(`${this.BASE_URL}/reservations/status/${code}`);
  // }

  // createReservation(name: string, email: string, phone: string, table: number, date: string,
  //   time: string, code: string): Observable<Reservation> {
  //   return this.http.post<Reservation>(`${this.BASE_URL}/reservations`,
  //   { name, email, phone, table, date, time, code });
  // }

  // cancelReservation(id: string): Observable<any> {
  //   return this.http.delete(`${this.BASE_URL}/reservations/delete/${id}`);
  // }

  form: FormGroup = new FormGroup ({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
    table: new FormControl(1, Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl(1, Validators.required),
    code: new FormControl(''),
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

  insertReservation(reservation: any) {
    // reservation.date = moment.utc(new Date(reservation.date).toISOString()).format('MM/DD/YYYY');
    this.reservationList.push({
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      table: reservation.table,
      date: reservation.date == "" ? "" : this.datePipe.transform(reservation.date, 'MM/dd/yyyy'),
      time: reservation.time,
      code: this.getUniqueCode(4),
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
