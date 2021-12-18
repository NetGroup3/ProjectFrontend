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
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  limit: number = 10
  page: number = 0
  key: string = ""
  category: string = ""
  sortedBy: string = ""
  ingredients: Ingredient[] = []
  toggle: boolean = true
  delIngredient: Ingredient = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    active: false,
    measurement: ""
  }

  constructor(private moderatorService: ModeratorService) {}

  ngOnInit(): void {
    this.search("")
  }

  getIngredients(limit: number, page: number, key: string, category: string, sortedBy: string): void {
    this.moderatorService.getIngredients(limit, page, key, category, sortedBy)
      .subscribe((response)=>{
        this.ingredients = response
        if (this.ingredients.length === 0) {
          this.page = -1
          this.next()
        }
      });
  }

  next() {
      this.page = this.page + 1;
      this.ngOnInit();

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
    this.moderatorService.deleteIngredient(this.delIngredient.id).subscribe(()=>{
      this.ngOnInit()
    });
  }

  delete(ingredient: Ingredient) {
    this.delIngredient = ingredient;
    this.toggle = !this.toggle;

  }

  search(sortedBy: string) {
    this.getIngredients(this.limit, this.page, this.key, this.category, sortedBy);
  }

}
