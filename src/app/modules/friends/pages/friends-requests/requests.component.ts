import {Component, OnInit, TemplateRef} from "@angular/core";
import {FriendRequest} from "../../models/friendRequest";
import {FriendService} from "../../services/friend.service";
import {NzNotificationService} from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-auth-user-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  limit: number = 10;
  offset: number = 0;
  friendRequests: FriendRequest[] = [];

  toggle: boolean = true;

  constructor(private friendService: FriendService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.getFRequests(this.limit, this.offset)
  }

  getFRequests(limit: number, offset: number): void {
    this.friendService.getRequests(limit, offset)
      .subscribe((response) => {
        this.friendRequests = response
      });
  }

  fRequest: FriendRequest = {
    id: 0,
    firstName: "",
    imageId: ""
  }

  accept(fRequest: FriendRequest) {
    this.fRequest = fRequest;
    this.friendService.acceptInvite(this.fRequest.id).subscribe({
      next: (): void => {
        this.friendRequests = this.friendRequests.filter((req) => req.id !== this.fRequest.id);
      }
    });
  }

  decline(fRequest: FriendRequest) {
    this.fRequest = fRequest;
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    this.friendService.declineInvite(this.fRequest.id).subscribe({
      next: (): void => {
        this.friendRequests = this.friendRequests.filter((req) => req.id !== this.fRequest.id);
        this.notification.blank('Invite declined', '', {});
      }
    });
  }

  change() {
    this.toggle = !this.toggle;
  }

  next() {
    if (this.friendRequests.length === 0 || this.friendRequests.length < 10) {
    } else {
      this.offset = this.offset + 10;
      this.getFRequests(this.limit, this.offset);
    }
  }

  prev() {
    if (this.offset > 0) {
      this.offset = this.offset - 10;
      this.getFRequests(this.limit, this.offset);
    }
  }

  createNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

}
