import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../modules/auth/services/client/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private tokenService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
  }

  get isUser() {
    return this.tokenService.getUserRole() === 'USER';
  }

  get isAdmin() {
    return this.tokenService.getUserRole() === 'ADMIN';
  }

  get isModerator() {
    return this.tokenService.getUserRole() === 'MODERATOR';
  }

}
