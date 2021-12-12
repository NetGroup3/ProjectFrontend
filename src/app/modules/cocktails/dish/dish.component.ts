import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {Dish} from "../../core/models/dish";
import {Ingredient} from "../../core/models/ingredient";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {AuthService} from "../../auth/services/client/auth.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  listOfOption: Array<{ value: string; label: string; id: number;}> = [];
  ingredients: Ingredient[] = [];
  list: string [] = []
  value: number [] = [];
  listOfSelectedValue = [];
 // defaultOption = [...this.listOfSelectedValue];

  selectedValue = 'Default';
  limit: number = 10;
  page: number = 0;
  Dishes: Dish[] = [];
  key: string = ""
  category: string = ""
  sortedBy: string = ""
  desc: boolean = false

  delDish: Dish = {
    id: 0,
    title: "",
    description: "",
    category: "",
    receipt: "",
    imageId: "",
    active: false,
    likes: 0
  }

  constructor(private moderatorService: ModeratorService,
              private authService: AuthService) {
  }
  toggle: boolean = true;
  id: boolean = false;
  title: boolean = false;
  Category: boolean = false;
  edit_delete: boolean = false;
  like: boolean = true;
  favourite: boolean = true;
  liked: boolean = false;


  ngOnInit(): void {
    if(this.authService.getUserRole() == "MODERATOR"){
      this.edit_delete = false
    }
    else if(this.authService.getUserRole() == "USER"){
      this.edit_delete = true
      this.like = false
      this.favourite = false
    }
    else {
      this.edit_delete = true
      this.like = false
      this.favourite = true
    }
    this.search("")
    this.getIngredients();
  }

  isNotSelected(value: any): boolean {
    console.log(value)
    return this.listOfOption.indexOf(value) === -1;
  }

  getDishes(limit: number, page: number, desc: boolean, key: string, category: string, sortedBy: string, userId: number): void {
    console.log(key)
    this.moderatorService.get_dishes(limit, page, desc, key, category, sortedBy, userId)
      .subscribe((response:any)=>{
        console.log(response)
        this.Dishes = response
      });
  }

  getIngredients(){
    this.moderatorService.get_ingridients(100, 0, "", "", "")
      .subscribe((response:any)=>{
        console.log(response)
        this.ingredients = response
        // this.ingredients.forEach(ingredient => this.list.push(ingredient.title))
        // console.log(this.list)
        this.listOfOption = this.ingredients.map(item => ({
          value: item.title,
          label: item.title,
          id: item.id
        }));
      });
  }

  next() {
    if(this.Dishes.length === 0 || this.Dishes.length < 10){
      this.page = 0;
      this.ngOnInit();
    }
    else{
      this.page = this.page + 1;
      this.ngOnInit();
    }

  }

  prev() {
    if(this.page > 0) {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  change() {
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    console.log(this.delDish)
    this.moderatorService.delete_dish(this.delDish.id).subscribe((response:any)=>{
      console.log(response)
    });
  }

  initImage(imageId: string): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(imageId)
      .resize(thumbnail().width(50).height(50))
      .roundCorners(byRadius(10));
  }

  delete(dish: Dish) {
    this.delDish = dish;
    this.toggle = !this.toggle;

  }

  search(sortedBy: string) {
    this.getDishes(this.limit, this.page, this.desc, this.key, this.category, sortedBy, +this.authService.getUserId());
  }

  likes(id: number) {
    this.liked = !this.liked;
    if(this.liked){
      this.moderatorService.like(id).subscribe((response:any) => {
        console.log(response)
      })
    }
  }

  searchIngredients() {
    console.log(this.listOfSelectedValue)
    if(this.listOfSelectedValue.length != 0) {
      this.moderatorService.searchByIngredients(this.listOfSelectedValue, this.limit, this.page).subscribe((response: any) => {
        console.log(response)
        this.Dishes = response
      })
    }
  }
}
