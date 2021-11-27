import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.scss']
})
export class IngridientsComponent implements OnInit {
  limit: number = 10;
  page: number = 0;
  Ingridients: Ingredient[] = [];

  delIngredient: Ingredient = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    isActive: false,
    measurement: ""
  }

  constructor(private moderatorService: ModeratorService) {
  }
  toggle: boolean = true;
  ngOnInit(): void {
    this.getIngridients(this.limit, this.page);
  }

  getIngridients(limit: number, page: number): void {
    this.moderatorService.get_ingridients(limit, page)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.Ingridients = response.body
      });
  }

  next() {
    if(this.Ingridients.length === 0 || this.Ingridients.length < 10){
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
    console.log(this.delIngredient)
    this.moderatorService.delete_ingredient(this.delIngredient.id).subscribe((response:any)=>{
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

  delete(ingridient: Ingredient) {
    this.delIngredient = ingridient;
    this.toggle = !this.toggle;

  }
}
