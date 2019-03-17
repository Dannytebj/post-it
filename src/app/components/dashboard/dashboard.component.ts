import { GroupResponse } from './../../shared/interfaces/group.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { CreateGroupModalComponent } from '../create-group-modal/create-group-modal.component';
import { GroupService } from 'src/app/shared/services/group.service';
import { AllResponse } from './../../shared/interfaces/response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  createGroupForm = new FormControl('', [Validators.required]);

  groups = [];
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
