import { Component, OnInit } from '@angular/core';
import {Friend} from "../../models/friend";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-auth-user-friends',
  templateUrl: './auth-user-friends.component.html',
  styleUrls: ['./auth-user-friends.component.scss']
})
export class AuthUserFriendsComponent implements OnInit {
  limit: number = 10;
  offset: number = 0;
  friends: Friend[] = [];

  toggle: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getFriends(this.limit, this.offset)
  }

  getFriends(limit: number, offset: number): void {
    this.userService.getFriends(limit, offset)
      .subscribe((response)=>{
        this.friends = response
      });
  }

  delFriend: Friend = {
    id: 0,
    firstName: "",
    imageId: ""
  }

  delete(friend: Friend) {
    this.delFriend = friend;
    this.toggle = !this.toggle;

  }

  ok() {
    this.toggle = !this.toggle;
    console.log(this.delFriend)
    this.userService.deleteFriend(this.delFriend.id).subscribe((response)=>{
      this.friends = this.friends.filter((friend) => friend.id !== this.delFriend.id);
      console.log(response)
    });
  }

  change() {
    this.toggle = !this.toggle;
  }

  next() {
    if(this.friends.length === 0 || this.friends.length < 10){
    }
    else{
      this.offset = this.offset + 10;
      this.getFriends(this.limit, this.offset);
    }
  }

  prev() {
    if(this.offset > 0) {
      this.offset = this.offset - 10;
      this.getFriends(this.limit, this.offset);
    }
  }

}
