import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  isLoggedIn = false;

  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastr: ToastrService
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('currentUser'));
      } else {
        this.isLoggedIn = false;
        localStorage.setItem('currentUser', null);
        JSON.parse(localStorage.getItem('currentUser'));
      }
    });
   }
   signIn(email, password) {
     return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.isLoggedIn = true;
        this.redirectToDashboard();
        this.setUserData(response.user, '');
      })
      .catch((error) => {
        this.toastr.error(error.message);
        console.log(error);
      });
   }

   signUp(email, password, name) {
     return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.isLoggedIn = true;
        this.redirectToDashboard();
        this.setUserData(response.user, name);
      })
      .catch((error) => {
        console.log(error);
      });
   }

    redirectToDashboard() {
     return this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
    });
   }

   setUserData(user: User, name ) {
     const userRef: AngularFirestoreDocument<any> = this.firestore.doc(`users/${user.uid}`);
     const username = (name !== '') ? name : user.displayName;
     const userData: User = {
       uid: user.uid,
       email: user.email,
       displayName: username,
       photoURL: user.photoURL,
     };
     return userRef.set(userData, {
       merge: true
     });
   }
}
