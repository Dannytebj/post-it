import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as io from 'socket.io-client';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:3333';
  public socket;

  constructor(
    public authService: AuthService,
    public baseService: BaseService
  ) {
    this.socket = io(this.url);
  }

  getMessages(groupId) {
    return this.baseService.http.get(`${this.baseService.url}/messages/${groupId}`, { headers: this.baseService.header });
  }
  sendMessage(message, groupId) {
    return this.baseService.http.post(`${this.baseService.url}/message`, {message, groupId }, { headers: this.baseService.header});
  }
}
