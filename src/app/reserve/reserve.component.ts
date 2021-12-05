import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { TableService } from '../service/table.service';
import { TimeService } from '../service/time.service';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Optional } from '@angular/core';    
import * as moment from 'moment';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  minDate: Date;

  constructor(public router: Router, public reservationService: ReservationService, 
    public tableService: TableService, public timeService: TimeService, @Optional() public dialogRef: MatDialogRef<ReserveComponent>,
    public notifcationService: NotificationService) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.reservationService.getReservations();
  }

  createReservation() {
    if(this.reservationService.form.valid){

      // check if reserving a table in the past
      let currentDate = moment.utc().local().format('MM/DD/YYYY');
      let selectedDate = moment(this.reservationService.form.value.date).format('MM/DD/YYYY');
      if(currentDate == selectedDate) {
        let currentTime = moment.utc().local().format('hh:mm a');
        let selectedTime = moment(this.reservationService.form.value.time, 'h:mm a').format('hh:mm a');
        console.log(selectedDate + " " + selectedTime);
        if(currentTime > selectedTime) {
          this.notifcationService.warn('! Reservation in the Past');
          return;
        }
      }

      // check if reserving a table that has already been reserved at a certain time/date
      let stamp = selectedDate + " " + this.reservationService.form.value.time + " " 
      + this.reservationService.form.value.table;
      const promise = new Promise(res => {this.reservationService.getReservationByStamp(stamp).subscribe(list => {
          let array = list.map(item => {
            return {
              $key: item.key,
              ...item.payload.val()
            }
          });
          res(array);
        });
      });

      promise.then((value: any) => {
        if(value.length != 0) {
          if(!(value.length === 1 && value[0].code === this.reservationService.form.value.code)){
            this.notifcationService.warn("! Reservation Not Available");
            return;
          }
        }
        if(!this.reservationService.form.get('$key')?.value)
          this.reservationService.insertReservation(this.reservationService.form.value);
        else  
          this.reservationService.updateReservation(this.reservationService.form.value);
        this.reservationService.form.reset();
        this.reservationService.initFormGroup();
        this.notifcationService.success(':: Successfully Reserved');
        if(this.router.url === '/reserve') {
          this.router.navigate(['/thank-you']);
        }
        //setTimeout(() => { this.router.navigate(['/']); }, 3000);
        this.onClose();
      });
    }
  }

  onClose() {
    this.reservationService.form.reset();
    this.reservationService.initFormGroup();
    this.dialogRef.close();
  }
}
