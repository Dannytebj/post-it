import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from './../interfaces/user.interface';
import { AllResponse } from '../interfaces/response.interface';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  baseUrl = 'http://localhost:3333/api/v1/';
  public header: HttpHeaders;
  constructor(
    public firestore: AngularFirestore,
    public fireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toastr: ToastrService,
    public http: HttpClient
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('currentUser'));
      } else {
        localStorage.setItem('currentUser', null);
        JSON.parse(localStorage.getItem('currentUser'));
      }
    });
  }
  get authHeader() {
    return this.header;
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return (user !== null) ? true : false;
  }

  signIn(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.getUserToken(email).subscribe((res: AllResponse) => {
          this.header = new HttpHeaders().set('token', res.token);
          localStorage.setItem('token', res.token);
          this.redirectToDashboard();
        });
      })
      .catch((error) => {
        this.toastr.error(error.message);
        console.log(error);
      });
  }

  signUp(email, password, name) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.setUserData(user, name);
        // this.currentUser.displayName = name;
        this.createUser(user.email, name).subscribe((res: AllResponse) => {
          this.header = new HttpHeaders().set('token', res.token);
          localStorage.setItem('token', res.token);
          this.redirectToDashboard();
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Creates a user oject on mongo
   *
   * @param {*} email
   * @param {*} name
   * @returns
   * @memberof AuthService
   */
  createUser(email, name) {
    return this.http.post(`${this.baseUrl}user/create`, { name, email });
  }

  getUserToken(email) {
    return this.http.post(`${this.baseUrl}user/getToken`, { email });
  }

  redirectToDashboard() {
    return this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
    });
  }

  setUserData(user: User, name) {
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

    // Sign out
    signOut() {
      return this.fireAuth.auth.signOut().then(() => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['sign-in']);
      });
    }
}
