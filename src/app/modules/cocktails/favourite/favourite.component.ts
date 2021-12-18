import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {AuthService} from "../../auth/services/client/auth.service";
import {DishFormat} from "../../core/models/dishFormat";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent  implements OnInit {
  Dishes: DishFormat[] = [];

  constructor(
    private moderatorService: ModeratorService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.getFavourite();
  }


  getFavourite () : void {
    this.moderatorService.getFavourite().subscribe(
      {
        error: (error:HttpErrorResponse): void => {console.log(error.error)},
        next: (response:any): void => {
          this.Dishes = response
        },
      }
    );
  }

  trimString (string : string, length : number) : string {
    if (string.length <= length) return string;
    string = string.substring(0, length - 3).concat("...");
    return string;
  }

  favouriteToggle (favourite : boolean, dish : number) : boolean {
    if (favourite) return this.moderatorService.removeFavourite(dish).subscribe().closed
    return !this.moderatorService.addFavourite({
      user: Number(this.authService.getUserId()),
      dish: dish
    }).subscribe().closed
  }


}

