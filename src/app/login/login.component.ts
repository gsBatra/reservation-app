import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router, 
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null)
      this.router.navigate(['/reservation-list']);
  }

  showPassword() {
    let password = document.getElementById("pw");
    const type = password!.getAttribute('type') === 'password' ? 'text' : 'password';
    password!.setAttribute('type', type);
  }

  async onSignIn(email: string, password: string){
    await this.loginService.signin(email, password);
    if(localStorage.getItem('user') === null) {
      this.notificationService.warn("! Invalid Login");
      return;
    }
    this.notificationService.success(":: Succesfully Logged In")
    this.router.navigate(['/reservation-list']);
  }
}
