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
  private limit: number = 10;
  public offset: number = 0;
  public friendRequests: FriendRequest[] = [];
  public toggle: boolean = true;

  constructor(private friendService: FriendService,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    this.getFRequests(this.limit, this.offset)
  }

  getFRequests(limit: number, offset: number): void {
    this.friendService.getRequests(limit, offset)
      .subscribe((response: FriendRequest[]) => {
        this.friendRequests = response
      });
  }

  friendRequest: FriendRequest = {
    id: 0,
    firstName: "",
    imageId: ""
  }

  accept(friendRequest: FriendRequest) {
    this.friendRequest = friendRequest;
    this.friendService.acceptInvite(this.friendRequest.id).subscribe({
      next: (): void => {
        this.friendRequests = this.friendRequests.filter((req: FriendRequest) => req.id !== this.friendRequest.id);
      }
    });
  }

  decline(friendRequest: FriendRequest) {
    this.friendRequest = friendRequest;
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    this.friendService.declineInvite(this.friendRequest.id).subscribe({
      next: (): void => {
        this.friendRequests = this.friendRequests.filter((req: FriendRequest) => req.id !== this.friendRequest.id);
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
