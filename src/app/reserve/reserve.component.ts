import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { TableService } from '../service/table.service';
import { TimeService } from '../service/time.service';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Optional } from '@angular/core';    

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
      console.log(this.reservationService.form.value);
      if(!this.reservationService.form.get('$key')?.value)
        this.reservationService.insertReservation(this.reservationService.form.value);
      else  
        this.reservationService.updateReservation(this.reservationService.form.value);
      this.reservationService.form.reset();
      this.reservationService.initFormGroup();
      this.notifcationService.success(':: Successfully Reserved');
      //setTimeout(() => { this.router.navigate(['/']); }, 3000);
      this.onClose();
    }
  }

  onClose() {
    this.reservationService.form.reset();
    this.reservationService.initFormGroup();
    this.dialogRef.close();
  }
}
