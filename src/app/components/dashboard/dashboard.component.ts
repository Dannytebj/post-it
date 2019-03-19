import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';
import { GroupService } from 'src/app/shared/services/group.service';
import { GroupResponse } from './../../shared/interfaces/group.interface';
import { GroupsResponse } from './../../shared/interfaces/groups.interface';
import { AllResponse } from './../../shared/interfaces/response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  createGroupForm = new FormControl('', [Validators.required]);
  loading = true;

  groups = [];
  constructor(
    public dialog: MatDialog,
    public groupService: GroupService
  ) { }

  ngOnInit() {
    this.groupService.getUsersGroups().subscribe((res: GroupsResponse) => {
      this.groups = [...this.groups, ...res.groups];
      this.loading = false;
    },
    (error) => {
      console.log(error);
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(CreateGroupModalComponent, {
      width: '400px',
      height: '300px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  resetForm() {
    return this.createGroupForm.reset();
  }

  createGroup() {
    this.groupService.createGroup(this.createGroupForm.value).subscribe(
      (res: GroupResponse) => {
        this.groups.push(res.group);
        this.resetForm();
      },
      ({ error }) => {
        console.log(error.message);
      });
  }

  ngOnDestroy() {

  }

}
