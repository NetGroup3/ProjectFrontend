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
  }
}
