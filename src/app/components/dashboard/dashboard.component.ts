import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
groups = [
  { id: 1, name: 'Group 1'},
  { id: 2, name: 'Group 2'},
  { id: 3, name: 'Group 3'}
];
  constructor() { }

  ngOnInit() {
  }

}
