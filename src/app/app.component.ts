import {Component, OnInit} from '@angular/core';
import {AuthService} from "./modules/auth/services/client/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }

  isCollapsed = false;

  public ngOnInit(): void {
    this.authService.loadToken();
    console.log(this.authService.getToken());
    this.authService.loadUserData();
    console.log(this.authService.getUserId());
    console.log(this.authService.getUserFirstname());
    console.log(this.authService.getUserLastname());
    console.log(this.authService.getUserRole());
    console.log(this.authService.getImageId());
  }
}
