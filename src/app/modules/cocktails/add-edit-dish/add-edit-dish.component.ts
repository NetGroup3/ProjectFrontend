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
//  public img: CloudinaryImage = this.initImage();
  Ingridients: Ingredient [] = [];
  AllIngridients: Ingredient [] = [];
  //checked: boolean [] = [];
  Kitchenware: Kitchenware [] = [];
  AllKitchenware: Kitchenware [] = [];
  selectedIngredients: any;
  selectedKitchenware: any;
  selectedLabels: any;
  Labels: any;
  AllLabels: any;
  dish_ingredient: Dish_ingredients = {
    id: 0,
    dish: 0,
    ingredient: 0,
    amount: 0
  };
  dish_kitchenware: Dish_kitchenware = {
    id: 0,
    dish: 0,
    kitchenware: 0
  };

  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
    private uploadService: UploadService,
    private router: Router,
    private ingredientList: ListComponent
  ) {
  }

  ngOnInit(): void {
    if (Number(this.route.snapshot.paramMap.get('id')) > 0) {
      this.getDish();
      console.log(this.dish.imageId);
      this.img = this.initImage();
    }
  }



  onAddClick(): void {
    this.ingredientList.check()
    this.changesIngredient = this.ingredientList.changes
    console.log(this.ingredientList.changes)
    // if (this.dish.id === 0) {
    //   this.moderatorService.add_dish(this.dish).subscribe((response: any) => {
    //     console.log(response)
    //   });
    // } else {
    //   this.moderatorService.edit_dish(this.dish).subscribe((response: any) => {
    //     console.log(response)
    //   });
    // }
    // console.log(this.dish)
    // this.router.navigate(['moderator/cocktails'])
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id)
      .subscribe((response: any) => {
        console.log(response)
        this.dish = response.dish
        this.Ingridients = response.ingredients
        this.Kitchenware = response.kitchenware
        console.log(this.Ingridients)
        this.img = this.initImage();
      });
  }

  initImage(): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.dish.imageId)
      .resize(thumbnail().width(180).height(180))
      .roundCorners(byRadius(10));
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response => {
      this.dish.imageId = response.public_id;
      this.img = this.initImage();
      this.onAddClick();
    });
  }
}
