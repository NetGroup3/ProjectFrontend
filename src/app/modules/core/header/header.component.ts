import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";
  private readonly USER_ID: string = "USER_ID";
  private readonly USER_FIRSTNAME: string = "USER_FIRSTNAME";
  private readonly USER_LASTNAME: string = "USER_LASTNAME";
  private readonly USER_ROLE: string = "USER_ROLE";
  private readonly USER_IMAGE_ID: string = "USER_IMAGE_ID";

  ngOnInit(): void {
  }

  logOut() {
    localStorage.setItem(this.TOKEN_KEY, "");
    localStorage.setItem(this.USER_ID, "");
    localStorage.setItem(this.USER_FIRSTNAME, "");
    localStorage.setItem(this.USER_LASTNAME, "");
    localStorage.setItem(this.USER_ROLE, "");
    localStorage.setItem(this.USER_IMAGE_ID, "");
    this.router.navigate(['/login']);
  }

}
