import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../shared/services/message.service';
import { GroupService } from './../../shared/services/group.service';
import { ToastrService } from 'ngx-toastr';

import { GroupResponse } from './../../shared/interfaces/group.interface';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
groupId: string;
groupName: string;
inputText = '';
actionTitle = '';
messages = [];
groupUsers = [];
notGroupUsers = [];
showEmoji: boolean;
showAddUserDropdown: boolean;
KEY_CODES = {
  ENTER: 13
};
  constructor(
    public route: ActivatedRoute,
    public messageService: MessageService,
    public groupService: GroupService,
    private el: ElementRef,
    public toastr: ToastrService
    ) { }

  ngOnInit() {
    this.actionTitle = (this.showAddUserDropdown) ? 'close' : 'Add user';

    this.route.params.subscribe(params => {
      this.messages = [];
      this.groupId = params['id'];
      this.getGroupData();
      this.usersNotInGroup();
      this.messageService.getMessages(this.groupId).subscribe((res: any) => {
        this.messages = [...this.messages, ...res.messages];
      });
      this.getNewMessage(this.groupId);
    });
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.KEY_CODES.ENTER) {
      this.messageService.sendMessage(this.inputText, this.groupId)
        .subscribe(
          (response) => {
            this.inputText = '';
          },
          (error) => {
            this.toastr.error(error);
          });
    }
  }

  getNewMessage(groupId) {
    this.messageService.socket.on(`message:${groupId}`, (message) => {
      this.messages.push(message);
    });
  }

  getGroupData() {
    this.groupService.getGroup(this.groupId).subscribe((res: GroupResponse) => {
      this.groupName = res.group.name;
    });
  }

  handleClickOutside(event) {
    const smileyElement = event.target;
   if (this.showEmoji && !smileyElement.classList.contains('smiley-toggle')) {
    return  this.showEmoji = false;
   }
   this.showEmoji = true;
  }

  addEmoji = ({ emoji }) => {
    let emojiPic;
    if (emoji.unified.length <= 5) {
      emojiPic = String.fromCodePoint(+`0x${emoji.unified}`);
      this.inputText = this.inputText + emojiPic;
    } else {
      const sym = emoji.unified.split('-');
      const codesArray = [];
      sym.forEach(el => codesArray.push('0x' + el));

      emojiPic = String.fromCodePoint(...codesArray);
      this.inputText = this.inputText + emojiPic;
    }
  }
  toggleEmoji() {
    return this.showEmoji = !this.showEmoji;
  }
  toggleAddUserDropdown() {
    this.actionTitle = (!this.showAddUserDropdown) ? 'close' : 'Add user';
    return this.showAddUserDropdown = !this.showAddUserDropdown;
  }

  usersNotInGroup() {
    this.groupService.getUsersNotInGroup(this.groupId).subscribe((data: any) => {
      this.notGroupUsers = data.users;
    });
  }

  addUser(id, index) {
    this.groupService.addUserToGroup(this.groupId, id).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.notGroupUsers.splice(index, 1);
    }, (err) => {
      this.toastr.error(err);
      console.log(err);
    });
  }

}
