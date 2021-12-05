import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckStatusComponent } from './check-status/check-status.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { ReserveComponent } from './reserve/reserve.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'reserve',
    component: ReserveComponent,
  },
  {
    path: 'reservation-list',
    component: ReservationListComponent
  },
  {
    path: 'check-status',
    component: CheckStatusComponent
  },
  {
    path: 'thank-you',
    component: ThankYouComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
