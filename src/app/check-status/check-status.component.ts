import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReserveComponent } from '../reserve/reserve.component';


@Component({
  selector: 'app-check-status',
  templateUrl: './check-status.component.html',
  styleUrls: ['./check-status.component.css']
})
export class CheckStatusComponent implements OnInit {

  public loading: boolean;
  public isFound: boolean;

  reservation = {
    $key: "",
    name: "",
    email: "",
    time: "",
    date: "",
    phone: "",
    table: 1,
    code: "",
  }

  constructor(private reservationService: ReservationService, private router: Router, 
    private notificationService: NotificationService, private dialog: MatDialog) { 
    this.isFound = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.reservationService.getReservations();
  }

  getReservation() {
    this.loading = true;
    this.reservationService.getReservationByCode(this.reservation.code).subscribe(list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      });
      if(array.length == 0){
        if(!this.isFound)
          this.notificationService.warn("! Reservation Not Found")
      } else {
        if(!this.isFound)
          this.notificationService.success(":: Reservation Found")
        let foundReservation = array[0];
        this.isFound = true;
        this.reservation.$key = foundReservation.$key;
        this.reservation.name = foundReservation.name;
        this.reservation.email = foundReservation.email;
        this.reservation.time = foundReservation.time;
        this.reservation.date = foundReservation.date;
        this.reservation.phone = foundReservation.date;
        this.reservation.table = foundReservation.table;
        this.reservation.code = foundReservation.code;
      }
      console.log(array);
    });
    this.loading = false;
  }

  onEdit() {
    this.reservationService.populateForm(this.reservation);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%"
    this.dialog.open(ReserveComponent, dialogConfig);
  }

  onCancel() {
    if(confirm("Are you sure you want to cancel this reservation?")) {
      this.reservationService.deleteReservation(this.reservation.$key);
      this.notificationService.warn("! Deleted Successfully");
      setTimeout(() => { this.router.navigate(['/']); }, 3000);
    }
  }
}