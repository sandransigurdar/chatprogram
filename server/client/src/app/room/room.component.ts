import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ChatService } from "../chat.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId: string;
  messageToSend: string;
  chatArray: string[];
  userArray: string[];
  chat: string;
  constructor(private chatService: ChatService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['id'];
    this.chatService.getUsersList().subscribe(lst => {
      this.userArray = lst;
    })
  }

  sendMsg() {
    var arr = [];
    arr.length = 0;
    this.chatService.sendMessage(this.messageToSend, this.roomId).subscribe(lst => {
      arr.length = 0;
      for (var i = 0; i < lst.length; i++) {
        var x = lst[i];
        var y = x['message'];
        arr.push(y);
      }
      this.chatArray = arr;
    });

  }

  leaveTheRoom() {
    console.log("inside leavetheroom");
    var arr = [];
    arr.length = 0;
    this.chatService.partRoom(this.roomId).subscribe(lst => {
      console.log("gjkshæfdjk");

      this.router.navigate(["/rooms"]);
    })
  }

  getListOfUsers() {
    var room = this.roomId;
    this.chatService.getUsersList().subscribe(lst => {
      this.userArray = lst;
    });
  }

  enterPrivateChat() {
    alert("WAZUP");
  }
}
