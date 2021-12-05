import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { CheckStatusComponent } from './check-status/check-status.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReservationService } from './service/reservation.service';
import { TableService } from './service/table.service';
import { DatePipe } from '@angular/common';
import { TimeService } from './service/time.service';
import { LoginService } from './service/login.service';


// Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';

// Firebase
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReserveComponent,
    ReservationListComponent,
    CheckStatusComponent,
    ThankYouComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSelectModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    FlexLayoutModule,
  ],
  providers: [DatePipe, ReservationService, TableService, TimeService, LoginService],
  bootstrap: [AppComponent],
  entryComponents: [ReserveComponent]
})
export class AppModule { }
