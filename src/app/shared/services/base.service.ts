import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public url = 'http://localhost:3333/api/v1';

  public header: HttpHeaders;
  constructor(
    public http: HttpClient
  ) {
    const token = (localStorage.getItem('token')) ? localStorage.getItem('token') : null;
    this.header = new HttpHeaders().set('token', token);
  }
}
