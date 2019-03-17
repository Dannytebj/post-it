import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GroupService } from 'src/app/shared/services/group.service';
import { AllResponse } from './../../shared/interfaces/response.interface';

@Component({
  selector: 'app-create-group-modal',
  templateUrl: './create-group-modal.component.html',
  styleUrls: ['./create-group-modal.component.scss']
})
export class CreateGroupModalComponent implements OnInit {
createGroupForm = new FormControl('', [ Validators.required ]);
  constructor(
    private groupService: GroupService
    ) { }

  ngOnInit() {
  }

  createGroup() {
    // console.log(this.createGroupForm.value);
    this.groupService.createGroup(this.createGroupForm.value).subscribe(
      (res: AllResponse) => {
      console.log(res);
      this.groupService.updateGroups(res.group);
    },
    ({ error }) => {
      console.log(error.message);

    });
  }

}
