import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:3333';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public getNewMessage(groupId) {
    console.log(groupId, 'Message Service');
    this.socket.on(`message:${groupId}`, (message) => {
      console.log(message);
    });
  }
}
