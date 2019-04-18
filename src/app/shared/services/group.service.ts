import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
header: HttpHeaders;
baseUrl = 'http://localhost:3333/api/v1/';
private createGroupSubject = new Subject<any>();

  constructor(
    public baseService: BaseService,
    ) {
      const token = localStorage.getItem('token');
      this.header = new HttpHeaders().set('token', token);
    }

  /**
   * Creates a broadcast group
   *
   * @param {string} name
   * @returns {Observable}
   * @memberof GroupService
   */
  createGroup(name) {
    return this.baseService.http.post(`${this.baseUrl}group/create`, { name }, { headers: this.baseService.header });
  }

  updateGroups(group) {
    this.createGroupSubject.next(group);
  }

  /**
   * Gets a users groups
   *
   * @returns {Observable}
   * @memberof GroupService
   */
  getUsersGroups() {
    return this.baseService.http.get(`${this.baseUrl}user/groups`, { headers: this.baseService.header });
  }
  /**
   * Gets a groups data by id
   *
   * @param {string} id
   * @returns {Observable}
   * @memberof GroupService
   */
  getGroup(id) {
    return this.baseService.http.get(`${this.baseUrl}group/${id}`, { headers: this.baseService.header });
  }
  getUsersNotInGroup (id) {
    return this.baseService.http.get(`${this.baseUrl}group/notUsers/${id}`,  { headers: this.baseService.header });
  }

  addUserToGroup(groupId, userId) {
    return this.baseService.http.post(`${this.baseUrl}group/user/add`, { groupId, userId }, { headers:  this.baseService.header });
  }
}
