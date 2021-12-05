import { Component, OnInit, ViewChild} from '@angular/core';
import { ReservationService } from '../service/reservation.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReserveComponent } from '../reserve/reserve.component';
import { NotificationService } from '../service/notification.service';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  loading = true;
  searchKey: string;
  isLoggedIn = false;
  reservations!: MatTableDataSource<any>;
  columns = ['date', 'time', 'name', 'email', 'phone', 'table', 'code', 'edit', 'cancel'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private reservationService: ReservationService, private dialog: MatDialog,
    private notificationService: NotificationService, private router: Router, private loginService: LoginService) { 
    this.searchKey = "";
  }

  ngOnInit(): void {
    if(localStorage.getItem('user') === null) {
      this.notificationService.warn("! User Not Logged In");
      this.router.navigate(['/login']);
    } else {
      this.isLoggedIn = true;
    }

    this.reservationService.getReservations().subscribe(list => {
      let array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      });
      this.reservations = new MatTableDataSource(array);
      this.reservations.sort = this.sort;
      this.reservations.paginator = this.paginator;
    });
  }

  onLogout() {
    if(confirm("Are you sure you want to logout?")) {
      this.isLoggedIn = false;
      this.loginService.logout();
      this.notificationService.success(":: Successfully Logged Out")
      this.router.navigate(['/login']);
    }
  }

  onCancel($key: string){
    if(confirm("Are you sure you want to cancel this reservation?")) {
      this.reservationService.deleteReservation($key);
      this.notificationService.warn("! Deleted Successfully");
    }
  }

  onCreate() {
    this.reservationService.initFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%"
    this.dialog.open(ReserveComponent, dialogConfig);
  }

  onEdit(reservation: any) {
    this.reservationService.populateForm(reservation);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "25%"
    this.dialog.open(ReserveComponent, dialogConfig);
  }

  onSearchClear(): void {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter(): void {
    this.reservations.filter = this.searchKey.trim().toLowerCase();
  }
}
