import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserProfile} from "../../models/user-profile";
import {ActivatedRoute} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: UserProfile = {
    id: 0,
    firstName: "",
    lastName: "",
    imageId: "",
    timestamp: ""
  };

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private notification: NzNotificationService,
  ) {
  }

  ngOnInit(): void {
    if (Number(this.route.snapshot.paramMap.get('id')) > 0) {
      this.getUser();
    }
  }

  getUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(id)
      .subscribe((response) => {
        this.user = response
      });
  }

  addFriend(user: UserProfile): void {
    this.user = user;
    this.userService.addFriend(this.user.id).subscribe({
      next: (): void => {
        this.notification.blank('Friend added', '', {});
      },
      error: (): void => {
        this.notification.blank('Friend already added', '', {});
      }
    })
  }

}
