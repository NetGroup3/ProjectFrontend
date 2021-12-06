import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {Ingredient} from "../../core/models/ingredient";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Observable} from "rxjs";
import {appLinks} from "../../../app.links";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.scss']
})
export class IngridientsComponent implements OnInit {
  limit: number = 10;
  page: number = 0;
  key: string = ""
  category: string = ""
  sortedBy: string = ""
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
  id: boolean = false;
  title: boolean = false;
  Category: boolean = false;

  ngOnInit(): void {
    this.search()
  }

  getIngridients(limit: number, page: number, key: string, category: string, sortedBy: string): void {
    console.log(key)
    this.moderatorService.get_ingridients(limit, page, key, category, sortedBy)
      .subscribe((response:any)=>{
        console.log(response)
        this.Ingridients = response
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

  delete(ingridient: Ingredient) {
    this.delIngredient = ingridient;
    this.toggle = !this.toggle;

  }

  search() {
    if(this.id){
      this.sortedBy = "id"
    }
    else if(this.title){
      this.sortedBy = "title"
    }
    else if(this.category){
      this.sortedBy = "category"
    }
    this.getIngridients(this.limit, this.page, this.key, this.category, this.sortedBy);
  }

}
