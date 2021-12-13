import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../../app.links";
import {Dish, Ingredient, Kitchenware, Label, Comment} from "./DataModel";
import {ModeratorService} from "../../../core/services/moderator.service";
import {AuthService} from "../../../auth/services/client/auth.service";


@Component({
  selector: 'app-user-dish',
  templateUrl: './user-dish.component.html',
  styleUrls: ['./user-dish.component.scss']
})
export class UserDishComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService,
              private moderatorService: ModeratorService
  ) {
  }

  dish: Dish = {
    active: false,
    category: "",
    description: "",
    favourite: false,
    id: 0,
    imageId: "",
    likes: 0,
    receipt: "",
    title: ""
  };

  dishId: number = 0;
  userId: number = 0;

  ingredients: Ingredient[] = [];
  kitchenware: Kitchenware[] = [];
  labels: Label[] = [];

  ngOnInit(): void {
    this.getDish();
    this.dishId = Number(this.route.snapshot.paramMap.get('id'));
    const uId = localStorage.getItem("USER_ID");
    if (uId !== null) {
      this.userId = Number(uId);
    }
    // this.http.get(appLinks.dish + "/?id=" + this.dishId + "&userId=" + this.userId).subscribe(res => {
    //   // @ts-ignore
    //   this.dish = res.dish;
    //   // @ts-ignore
    //   this.ingredients = res.ingredients;
    //   // @ts-ignore
    //   this.kitchenware = res.kitchenware;
    //   // @ts-ignore
    //   this.labels = res.labels;
    // });
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id, +this.authService.getUserId())
      .subscribe((response: any) => {
        console.log(response)
        this.dish = response.dish
      });
  }

}
