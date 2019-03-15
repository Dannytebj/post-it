import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
header: HttpHeaders;
baseUrl = 'http://localhost:3333/api/v1/';
private createGroupSubject = new Subject<any>();

  constructor(
    public authService: AuthService,
    ) {
      const token = localStorage.getItem('token');
      this.header = new HttpHeaders().set('token', token);
    }

  createGroup(name) {
    return this.authService.http.post(`${this.baseUrl}group/create`, { name }, { headers: this.header});
  }

  updateGroups(group) {
    this.createGroupSubject.next(group);
  }

  getGroup() {
    return this.createGroupSubject.asObservable();
  }
}
