import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../models/ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {ModeratorService} from "../../../services/moderator.service";
import {Location} from "@angular/common";
import {UploadService} from "../../auth/services/client/upload.service";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Dish} from "../../models/dish";
import {Kitchenware} from "../../models/kitchenware";
import {Dish_ingredients} from "../../models/dish_ingredients";
import {Dish_kitchenware} from "../../models/dish_kitchenware";
import {TransferItem} from "ng-zorro-antd/transfer";
import {ListComponent} from "../list/list.component";
import {AuthService} from "../../auth/services/client/auth.service";
import {InitDishService} from "../../../services/init-dish.service";
import {DishWrapperDto} from "../../models/dishWrapperDto";
import {DishIngredientDto} from "../../models/dishIngredientDto";

@Component({
  selector: 'app-add-edit-dish',
  templateUrl: './add-edit-dish.component.html',
  styleUrls: ['./add-edit-dish.component.scss'],
  providers: [ListComponent]
})
export class AddEditDishComponent implements OnInit {

  changesIngredient: any [] = []

  limit: number = 20
  page: number = 0

  list: TransferItem[] = [];
  list1: TransferItem[] = [];
  disabled = false;

  description: string = ""
  title: string = ""
  dish: Dish = {
    id: 0,
    title: "",
    description: "",
    category: "",
    receipt: "",
    imageId: "",
    active: false,
    likes: 0
  }
  public img: any;

  dishIngredientDto: DishIngredientDto = {
    ingredient: 0,
    amount: 0
  }
  kitchenware: number [] = [];
  labels: number [] = [];
  ingredients: DishIngredientDto [] = []

  dish_ingredient: Dish_ingredients [] = []
  dish_kitchenware: Dish_kitchenware [] = []

  dishWrapperDto: DishWrapperDto = {
    dish: this.dish,
    ingredients: this.ingredients,
    kitchenware: this.kitchenware,
    lable: this.labels,
  }

  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
    private uploadService: UploadService,
    private router: Router,
    private ingredientList: ListComponent,
    private authService: AuthService,
    private initDishService: InitDishService
  ) {
  }

  ngOnInit(): void {
    if (Number(this.route.snapshot.paramMap.get('id')) > 0) {
      this.getDish();
    }
  }

  onAddClick(): void {
    this.initDishService.changedIngredients.forEach(item => {
      this.dishIngredientDto.ingredient = +item.key
      this.dishIngredientDto.amount = 0
      this.ingredients.push(this.dishIngredientDto)
    })
    this.initDishService.changedKitchenware.forEach(item => this.kitchenware.push(+item.key))
    this.initDishService.changedLabel.forEach(item => this.labels.push(+item.key))
    if (this.dish.id === 0) {
      this.moderatorService.add_dish(this.dishWrapperDto).subscribe((response: any) => {
        console.log(response)
      });
    } else {
      this.moderatorService.edit_dish(this.dish).subscribe((response: any) => {
        console.log(response)
      });
    }
    //this.router.navigate(['moderator/cocktails'])
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id, +this.authService.getUserId())
      .subscribe((response: any) => {
        console.log(response)
        this.dish = response.dish
        this.img = this.uploadService.initImage(this.dish.imageId);
      });
  }


  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response => {
      this.dish.imageId = response.public_id;
      console.log(this.dish.imageId)
      this.img = this.uploadService.initImage(this.dish.imageId);
      //this.onAddClick();
    });
  }
}
