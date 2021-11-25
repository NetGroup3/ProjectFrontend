import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.scss']
})
export class AddEditIngredientComponent implements OnInit {

  description: string = ""
  title: string = ""
  ingridient: Ingredient = {
    id: 0,
    title: "",
    description: "",
    category: "",
    image_id: 0,
    is_active: false,
    measurement: ""
  };
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location
  ) {}
  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get('id')) > 0){
      this.getIngredient();
    }

  }
  goBack(): void {
    this.location.back();
  }

  onAddClick():void{
    console.log(this.ingridient)
    if(this.ingridient.id === 0){
      this.moderatorService.add_ingredient(this.ingridient).subscribe((response:any)=>{
      console.log(response)
      });
    }
    else {
      this.moderatorService.edit_ingredient(this.ingridient).subscribe((response:any)=>{
        console.log(response)
      });
    }
  }

  getIngredient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_ingridient(id)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.ingridient = response.body
      });
  }



}
