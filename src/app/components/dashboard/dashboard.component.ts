import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';
import { GroupService } from 'src/app/shared/services/group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
groups = [
  { id: 1, name: 'Group 1'},
  { id: 2, name: 'Group 2'},
  { id: 3, name: 'Group 3'}
];
  constructor(
    public dialog: MatDialog,
    public groupService: GroupService
    ) { }

  ngOnInit() {
    this.groupService.getGroup().subscribe(group => {
      this.groups.push(group);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateGroupModalComponent, {
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'DialogRef');
    });
  }

  ngOnDestroy() {

  }

}
