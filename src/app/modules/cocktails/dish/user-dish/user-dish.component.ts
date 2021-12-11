import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../../app.links";
import {Dish, Ingredient, Kitchenware, Label, Comment} from "./DataModel";

@Component({
  selector: 'app-user-dish',
  templateUrl: './user-dish.component.html',
  styleUrls: ['./user-dish.component.scss']
})
export class UserDishComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  dish: Dish = {
    active: false,
    category: "",
    description: "",
    favourite: false,
    id: 0,
    imageId: null,
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
    this.dishId = Number(this.route.snapshot.paramMap.get('id'));
    const uId = localStorage.getItem("USER_ID");
    if (uId !== null) {
      this.userId = Number(uId);
    }
    this.http.get(appLinks.dish + "/?id=" + this.dishId + "&userId=" + this.userId).subscribe(res => {
      // @ts-ignore
      this.dish = res.dish;
      // @ts-ignore
      this.ingredients = res.ingredients;
      // @ts-ignore
      this.kitchenware = res.kitchenware;
      // @ts-ignore
      this.labels = res.labels;
    });
  }
}
