import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NetProjectFrontend';
  userData:any={};
  getData(data:NgForm){
    console.warn(data)
    this.userData=data
  }
}
