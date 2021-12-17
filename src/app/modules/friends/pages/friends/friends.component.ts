import {Component, OnInit} from '@angular/core';
import {Friend} from "../../models/friend";
import {FriendService} from "../../services/friend.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Router} from "@angular/router";


@Component({
  selector: 'app-auth-user-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  public friends: Friend[] = [];
  private limit: number = 10;
  public offset: number = 0;
  public toggle: boolean = true;

  delFriend: Friend = {
    id: 0,
    firstName: "",
    imageId: ""
  }

  constructor(private router: Router,
              private friendService: FriendService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.getFriends(this.limit, this.offset)
  }

  getFriends(limit: number, offset: number): void {
    this.friendService.getFriends(limit, offset)
      .subscribe((response: Friend[]) => {
        this.friends = response
      });
  }

  delete(friend: Friend) {
    this.delFriend = friend;
    this.toggle = !this.toggle;

  }

  ok() {
    this.toggle = !this.toggle;
    this.friendService.deleteFriend(this.delFriend.id).subscribe({
      next: (): void => {
        this.friends = this.friends.filter((friend: Friend) => friend.id !== this.delFriend.id);
        this.notification.blank('Friend removed', '', {});
      }
    });
  }

  change() {
    this.toggle = !this.toggle;
  }

  next() {
    if (this.friends.length === 0 || this.friends.length < 10) {
    } else {
      this.offset = this.offset + 10;
      this.getFriends(this.limit, this.offset);
    }
  }

  prev() {
    if (this.offset > 0) {
      this.offset = this.offset - 10;
      this.getFriends(this.limit, this.offset);
    }
  }

  goToRequests() {
    this.router.navigate(["/user/requests"]);
  }

}
