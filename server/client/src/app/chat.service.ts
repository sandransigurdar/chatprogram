import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable"

@Injectable()
export class ChatService {

  socket: any;

  constructor() {
    this.socket = io("http://localhost:8080");
    this.socket.on("connect", function () {
    });
  }

  login(userName: string): Observable<boolean> {
    let observable = new Observable(observer => {
      this.socket.emit("adduser", userName, succeeded => {
        console.log("reply recived");
        observer.next(succeeded);
      });
    });

    return observable;
  }

  getRoomList(): Observable<string[]> {
    let obs = new Observable(observer => {
      this.socket.emit("rooms");
      this.socket.on("roomlist", (lst) => {
        let strArr: string[] = [];
        for (var x in lst) {
          if (lst.hasOwnProperty(x)) {
            strArr.push(x);
          }
        }
        observer.next(strArr);
      })
    });
    return obs;
  }

  addRoom(roomName: string): Observable<boolean> {
    const observable = new Observable(observer => {
      var param = {
        room: roomName
      };

      this.socket.emit("joinroom", param, function (a: boolean, b) {
        if (a === true) {
          observer.next(a);
          return param;
        }
      });
    });
    return observable;
  }

  sendMessage(message: string, roomn: string): Observable<string[]> {
    const obs = new Observable(observer => {
      if (message && roomn) {
        var param = {
          msg: message,
          roomName: roomn
        };
        this.socket.emit("sendmsg", param);
        this.socket.on("updatechat", (lst, history) => {
          if (roomn === lst) {
            const nana: string[] = history;

            for (var x in lst) {
              if (lst.hasOwnProperty(message)) {
                nana.push(message);
              }
            }
            observer.next(nana);
          }
        })
      }
    });
    return obs;
  }


  /*
  Used when a user wants to leave a room.
  Parameters:
  a single string, i.e. the ID of the room which the user is leaving.
  The server will then emit the "updateusers" event to the remaining 
  users in the room, and a "servermessage" with the first parameter set to "part".
   */




  partRoom(roomname: string): Observable<string[]> {

    let obs = new Observable(observer => {
      this.socket.emit("partroom", roomname);
      this.socket.on("updateuser", (room, roomusers, ops) => {
        observer.next(room);
        observer.next(roomusers);
        observer.next(ops);
      })
    });
    return obs;

  }




  joinRoom(roomn: string): Observable<boolean> {
    const observable = new Observable(observer => {
      var param = {
        room: roomn
      };

      this.socket.emit("joinroom", param, function (a: boolean, b: string) {
        if (a === true) {
          observer.next(a);
          return param;
        }
      });
    });
    return observable;
  }

  getUsersList(): Observable<string[]> {
    let obs = new Observable(observer => {
      this.socket.emit("users");
      this.socket.on("userlist", (lst) => {
        var strArr = [];
        strArr = lst;
        observer.next(strArr);
      })
    });
    return obs;
  }
}






