import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-user-sceleton',
  templateUrl: './user-sceleton.component.html',
  styleUrls: ['./user-sceleton.component.scss']
})
export class UserSceletonComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";


  ngOnInit(): void {
    if (localStorage.getItem(this.TOKEN_KEY) === "") {
      this.router.navigate(['/login']);
    }
  }

}



