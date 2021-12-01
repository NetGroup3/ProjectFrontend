import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-edit-dish',
  templateUrl: './add-edit-dish.component.html',
  styleUrls: ['./add-edit-dish.component.scss']
})
export class AddEditDishComponent implements OnInit {

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
    private router: Router
  ) {}
  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get('id')) > 0){
      this.getDish();
      console.log(this.dish.imageId);
      this.img = this.initImage();
    }

    this.moderatorService.get_ingridients(20, 0, "", "", "").subscribe((response:any)=>{
      console.log(this.Ingridients)
      for (let i = 0; i < response.body.length; i++) {
        let isExists = false;
        for (let j = 0; j < this.Ingridients.length; j++) {
          console.log(response.body[i].id,"   ", this.Ingridients[j].id)
          if (response.body[i].id == this.Ingridients[j].id) {
            console.log(111111)
            isExists = true;
          }
        }
        if (!isExists) {
          this.AllIngridients.push(response.body[i])
        }
      }
    });

    this.moderatorService.get_Kitchenware(20, 0, "", "", "").subscribe((response:any)=>{
      console.log(this.Kitchenware)
      for (let i = 0; i < response.body.length; i++) {
        let isExists = false;
        for (let j = 0; j < this.Kitchenware.length; j++) {
          if (response.body[i].id == this.Kitchenware[j].id) {
            isExists = true;
          }
        }
        if (!isExists) {
          this.AllKitchenware.push(response.body[i])
        }
      }

    });

  }
  goBack(): void {
    this.location.back();
  }

  onAddClick(): void{
    console.log(this.dish)

    if(this.dish.id === 0){
      this.moderatorService.add_dish(this.dish).subscribe((response:any)=>{
        console.log(response)
      });
    }
    else {
      this.moderatorService.edit_dish(this.dish).subscribe((response:any)=>{
        console.log(response)
      });
    }
    console.log(this.dish)
    this.router.navigate(['moderator/cocktails'])
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id)
      .subscribe((response:any)=>{
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
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.dish.imageId = response.public_id;
      this.img = this.initImage();
      this.onAddClick();
    });
  }


  submitIngredients() {
    console.log(this.selectedIngredients)
    console.log(this.Ingridients.filter(x => x.id == this.selectedIngredients))
    this.Ingridients.filter(x => x.id == this.selectedIngredients)

    for (let i = 0; i < this.selectedIngredients.length; i++) {
      this.dish_ingredient.ingredient = this.selectedIngredients[i];
      this.dish_ingredient.dish = this.dish.id;
      this.moderatorService.post_ingredient_dish(this.dish_ingredient).subscribe((response:any)=>{
            console.log(response)
      });
    }
    location.reload();

  }
  submitKitchenware() {
    console.log(this.selectedKitchenware)
    console.log(this.Kitchenware.filter(x => x.id == this.selectedKitchenware))

    for (let i = 0; i < this.selectedKitchenware.length; i++) {
      this.dish_kitchenware.kitchenware = this.selectedKitchenware[i];
      this.dish_kitchenware.dish = this.dish.id;
      this.moderatorService.post_kitchenware_dish(this.dish_kitchenware).subscribe((response:any)=>{
        console.log(response)
      });
    }
    location.reload();
  }

  submitLabels() {
    //console.log(this.selectedKitchenware)
    //console.log(this.Labels.filter(x => x.id == this.selectedLabels))
  }
}
