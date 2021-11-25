import { Component, OnInit } from '@angular/core';
import {Helper} from "../helper";
import { Location} from "@angular/common";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  private readonly USER_ROLE: string = "USER_ROLE";
  userRole = localStorage.getItem(this.USER_ROLE);

  ngOnInit(): void {
  }

}
