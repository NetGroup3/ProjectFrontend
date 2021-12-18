import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../../app.links";
import {Dish, Ingredient, Kitchenware, Label, Comment} from "./DataModel";
import {ModeratorService} from "../../../core/services/moderator.service";
import {AuthService} from "../../../auth/services/client/auth.service";
import {DishAll} from "../../../core/models/dishAll";


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

  dish: DishAll = {
    dish: {
      id: 0,
      title: "",
      description: "",
      category: "",
      receipt: "",
      imageId: "",
      active: false,
      likes: 0
    },
    ingredients: [],
    kitchenware: [],
    labels: []

  }

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
    this.moderatorService.getDish(id)
      .subscribe((response) => {
        this.dish.dish = response.dish
        this.dish.ingredients = response.ingredients
        this.dish.kitchenware = response.kitchenware
      });
  }

}
