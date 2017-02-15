import { Component, OnInit } from '@angular/core';
import { ChatService } from "../chat.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: string[];
  loginFailed: boolean = false;;
  newRoomName: string;

  constructor(private chatService: ChatService,
    private router: Router) {

  }

  ngOnInit() {
    this.chatService.getRoomList().subscribe(lst => {
      this.rooms = lst;
    })

  }

  createNewRoom() {
      //TODO ERRORHANDLING
      this.chatService.addRoom(this.newRoomName).subscribe(succeeded => {
        if(succeeded === true)
        {
          console.log("SUCCESS IN CREATENEWROOM");
          //this.router.navigate(["rooms", this.newRoomName]);
        }

      });
      this.newRoomName = "";
  }

  joinRoom(id:string)
  {
    
    this.chatService.joinRoom(id).subscribe(succeded =>{
      if(succeded == true)
      {
          this.router.navigate(["rooms", id]);
      }
      else
      {
        //whaterervjeig
      }
    })
  }
}

