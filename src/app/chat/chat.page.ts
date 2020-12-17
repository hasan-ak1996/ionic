import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  username = '';
  message = '';
  chats : any[] = [];
  constructor() { 
    firebase.database().ref('chats/').on('value', resp => {
      this.chats = [];
      this.chats = this.snapshotToArray(resp);
      console.log(this.chats)
    });
  }

  ngOnInit() {
  }
  snapshotToArray(snapshot: any){
    var arr : any []= [];
    snapshot.forEach((childSnapshot: any) => {
      const item = childSnapshot.val();
      item.key = childSnapshot.key;
      arr.push(item);
    });
  return arr;
  }
  login(){

    firebase.database().ref('users/').orderByChild('username').equalTo(this.username).once('value', snapshot => {
      if (snapshot.exists()) {
        localStorage.setItem('username', this.username);
      } else {
        const newUser = firebase.database().ref('users/').push();
        newUser.set({
          username : this.username
        })
        localStorage.setItem('username', this.username);
      }
      
    });
  }

  sendMessage(){
    const chat = { username :'', message: ''};
    chat.username = this.username;
    chat.message = this.message;
    
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
  }
}
