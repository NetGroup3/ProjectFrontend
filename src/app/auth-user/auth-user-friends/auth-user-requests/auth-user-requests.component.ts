import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {FRequest} from "../../../models/friendRequest";

@Component({
  selector: 'app-auth-user-requests',
  templateUrl: './auth-user-requests.component.html',
  styleUrls: ['./auth-user-requests.component.scss']
})
export class AuthUserRequestsComponent implements OnInit {
  limit: number = 10;
  offset: number = 0;
  fRequests: FRequest[] = [];

  toggle: boolean = true;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getFRequests(this.limit, this.offset)
  }

  getFRequests(limit: number, offset: number): void {
    this.userService.getRequests(limit, offset)
      .subscribe((response) => {
        console.log('test', response)
        this.fRequests = response
      });
  }

  fRequest: FRequest = {
    id: 0,
    firstName: "",
    imageId: ""
  }

  accept(fRequest: FRequest) {
    this.fRequest = fRequest;
      console.log(this.fRequest.id)
      this.userService.acceptInvite(this.fRequest.id).subscribe((response)=>{
        console.log(response)
        this.fRequests = this.fRequests.filter((req) => req.id !== this.fRequest.id);
      });
  }

  decline(fRequest: FRequest) {
    this.fRequest = fRequest;
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    console.log(this.fRequest)
    this.userService.declineInvite(this.fRequest.id).subscribe((response)=>{
      console.log(response)
      this.fRequests = this.fRequests.filter((req) => req.id !== this.fRequest.id);
    });
  }

  change() {
    this.toggle = !this.toggle;
  }

  next() {
    if (this.fRequests.length === 0 || this.fRequests.length < 10) {
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
}
