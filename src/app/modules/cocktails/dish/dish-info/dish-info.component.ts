import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Label} from "../../../core/models/label";
import {Kitchenware} from "../../../core/models/kitchenware";
import {Ingredient} from "../../../core/models/ingredient";
import {ModeratorService} from "../../../core/services/moderator.service";
import {DishAll} from "../../../core/models/dishAll";


@Component({
  selector: 'app-user-dish',
  templateUrl: './dish-info.component.html',
  styleUrls: ['./dish-info.component.scss']
})
export class DishInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private moderatorService: ModeratorService) {
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

  ingredients: Ingredient[] = [];
  kitchenware: Kitchenware[] = [];
  labels: Label[] = [];

  ngOnInit(): void {
    this.getDish();
    this.dishId = Number(this.route.snapshot.paramMap.get('id'));
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
