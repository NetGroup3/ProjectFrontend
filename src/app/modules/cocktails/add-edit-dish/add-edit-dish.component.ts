import {Component, OnInit} from '@angular/core';
import {Ingredient} from "../../core/models/ingredient";
import {ActivatedRoute, Router} from "@angular/router";
import {ModeratorService} from "../../core/services/moderator.service";
import {Location} from "@angular/common";
import {UploadService} from "../../auth/services/client/upload.service";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Dish} from "../../core/models/dish";
import {Kitchenware} from "../../core/models/kitchenware";
import {Dish_ingredients} from "../../core/models/dish_ingredients";
import {Dish_kitchenware} from "../../core/models/dish_kitchenware";
import {TransferItem} from "ng-zorro-antd/transfer";
import {ListComponent} from "../list/list.component";
import {AuthService} from "../../auth/services/client/auth.service";
import {InitDishService} from "../../core/services/init-dish.service";
import {DishWrapperDto} from "../../core/models/dishWrapperDto";
import {DishIngredientDto} from "../../core/models/dishIngredientDto";
import {DishKitchenwareDto} from "../../core/models/DishKitchenwareDto";
import {DishLabelDto} from "../../core/models/DishLabelDto";
import {Label} from "../../core/models/label";

@Component({
  selector: 'app-add-edit-dish',
  templateUrl: './add-edit-dish.component.html',
  styleUrls: ['./add-edit-dish.component.scss'],
  providers: [ListComponent]
})
export class AddEditDishComponent implements OnInit {

  dishIngredients: Ingredient [] = []
  dishKitchenware: Kitchenware [] = []
  dishLabels: Label [] = []

  limit: number = 20
  page: number = 0

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

  kitchenware: DishKitchenwareDto [] = [];
  labels: DishLabelDto [] = [];
  ingredients: DishIngredientDto [] = []


  dish_ingredient: Dish_ingredients [] = []
  dish_kitchenware: Dish_kitchenware [] = []

  dishWrapperDto: DishWrapperDto = {
    dish: this.dish,
    ingredients: this.ingredients,
    kitchenware: this.kitchenware,
    label: this.labels,
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
    console.log(this.initDishService.listIngredients)
    this.initDishService.listIngredients.forEach(item => {
      if (item.direction == "right") {
        this.ingredients.push({
          id: 0,
          dish: 0,
          amount: 0,
          ingredient: +item.key
        })
      }
    })
    this.initDishService.listKitchenware.forEach(item => {
      if (item.direction == "right") {
        this.kitchenware.push({id: 0, dish: 0, kitchenware: +item.key})
      }
    })
    this.initDishService.listLabels.forEach(item => {
      if (item.direction == "right") {
        this.labels.push({id: 0, dish: 0, label: +item.key})
      }
    })
    this.dishWrapperDto.dish = this.dish
    this.dishWrapperDto.ingredients = this.ingredients
    this.dishWrapperDto.kitchenware = this.kitchenware
    this.dishWrapperDto.label = this.labels
    if (this.dish.id === 0) {
      this.moderatorService.add_dish(this.dishWrapperDto).subscribe((response: any) => {
        console.log(response)
      });
    } else {

      this.moderatorService.edit_dish(this.dishWrapperDto).subscribe((response: any) => {
        console.log(response)
      });
    }
    this.router.navigate(['moderator/cocktails'])
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id, +this.authService.getUserId())
      .subscribe((response: any) => {
        console.log(response)
        //this.dish = response.dish
        this.dish.id = response.dish.id
        this.dish.title = response.dish.title
        this.dish.imageId = response.dish.imageId
        this.dish.active = response.dish.active
        this.dish.description = response.dish.description
        this.dish.receipt = response.dish.receipt
        this.dish.category = response.dish.category
        this.img = this.uploadService.initImage(this.dish.imageId);
        this.dishIngredients = response.ingredients
        this.dishKitchenware = response.kitchenware
        this.dishLabels = response.labels
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
