import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import {IngridientPage} from "../modules/auth/models/ingridient-page";

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.scss']
})
export class IngridientsComponent implements OnInit {

  Ingridients: Ingredient[] = [];
  // Ingridients: Ingredient[] = [ { id: 1, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   {id: 2, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 3, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 4, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 5, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 6, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 7, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 8, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 9, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""},
  //   { id: 10, title: 'water', category: "", description: "", image_id: 0, is_active:true, measurement: ""}];

  constructor(private moderatorService: ModeratorService) {
  }
//this.Ingridients = <Ingredient []> ingredients
  ngOnInit(): void {
    this.getIngridients();
  }

  getIngridients(): void {
    this.moderatorService.get_ingridients(20, 0)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.Ingridients = response.body
      });
  }

}
