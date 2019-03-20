import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../shared/services/message.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
groupId: string;
  constructor(
    public route: ActivatedRoute,
    public messageService: MessageService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
      this.messageService.getNewMessage(this.groupId);
      console.log(this.groupId);
    });
  }

}
