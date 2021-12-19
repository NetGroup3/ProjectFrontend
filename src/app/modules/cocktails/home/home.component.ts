import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  private readonly USER_ROLE: string = "USER_ROLE";
  userRole = localStorage.getItem(this.USER_ROLE);

}
