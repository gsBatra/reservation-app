import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;
  constructor(public firebaseAuth : AngularFireAuth) { }

  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch(err => {
        console.log("Invalid Login");
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('user');
  }
}
