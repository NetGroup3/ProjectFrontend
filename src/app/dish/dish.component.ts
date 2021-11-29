import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Dish} from "../models/dish";
import {Ingredient} from "../models/ingredient";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  limit: number = 10;
  page: number = 0;
  Dishes: Dish[] = [];
  key: string = ""
  category: string = ""
  sortedBy: string = ""

  delDish: Dish = {
    id:  0,
    title: "",
    image_id: "",
    description: "",
    category: "",
    receipt: "",
    active: false
  }

  constructor(private moderatorService: ModeratorService) {
  }
  toggle: boolean = true;
  id: boolean = false;
  title: boolean = false;
  Category: boolean = false;

  ngOnInit(): void {
    this.search()
  }

  getIngridients(limit: number, page: number, key: string, category: string, sortedBy: string): void {
    console.log(key)
    this.moderatorService.get_dishes(limit, page, key, category, sortedBy)
      .subscribe((response:any)=>{
        console.log(response)
        this.Dishes = response
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
    location.reload();
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

  search() {
    if(this.id){
      this.sortedBy = "id"
    }
    else if(this.title){
      console.log(111111111)
      this.sortedBy = "title"
    }
    else if(this.category){
      this.sortedBy = "category"
    }
    this.getIngridients(this.limit, this.page, this.key, this.category, this.sortedBy);
  }
}
