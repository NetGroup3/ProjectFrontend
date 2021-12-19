import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Label} from "../../../core/models/label";
import {Kitchenware} from "../../../core/models/kitchenware";
import {Ingredient} from "../../../core/models/ingredient";
import {Dish} from "./dish";
import {ModeratorService} from "../../../core/services/moderator.service";
import {AuthService} from "../../../auth/services/client/auth.service";


@Component({
  selector: 'app-user-dish',
  templateUrl: './dish-info.component.html',
  styleUrls: ['./dish-info.component.scss']
})
export class DishInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private authService: AuthService,
              private moderatorService: ModeratorService) {
  }

  dish!: Dish;

  dishId: number = 0;

  ingredients: Ingredient[] = [];
  kitchenware: Kitchenware[] = [];
  labels: Label[] = [];

  ngOnInit(): void {
    this.getDish();
    this.dishId = Number(this.route.snapshot.paramMap.get('id'));
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
        this.dish = response.dish;
      });
  }

}
