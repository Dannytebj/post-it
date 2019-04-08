import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from './../../shared/services/message.service';
import { GroupService } from './../../shared/services/group.service';
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
messages = [];
groupUsers = [];
showEmoji: boolean;
KEY_CODES = {
  ENTER: 13
};
  constructor(
    public route: ActivatedRoute,
    public messageService: MessageService,
    public groupService: GroupService,
    private el: ElementRef
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
      this.getGroupData();
      this.messageService.getMessages(this.groupId).subscribe((res: any) => {
        this.messages = [...this.messages, ...res.messages];
        console.log(res);
      });
      this.getNewMessage(this.groupId);
    });
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.KEY_CODES.ENTER) {
      console.log(this.inputText);
      this.messageService.sendMessage(this.inputText, this.groupId)
        .subscribe(
          (response) => {
            this.inputText = '';
            // console.log(response);
          },
          (error) => {

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

}
