import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.scss']
})
export class IngridientsComponent implements OnInit {


  Ingridients: Ingredient[] = [
    { id: 1, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 2, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 3, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 4, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 5, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 6, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 7, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 8, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 9, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'},
    { id: 10, title: 'Water', category: '', description: '', image_id:0, is_active:true, measurement: 'l'}
  ];

  constructor(private moderatorService: ModeratorService) {
  }

  ngOnInit(): void {
    this.getIngridients();
  }

  getIngridients(): void {
    // this.moderatorService.get_ingridients()
    //   .subscribe(ingridients => this.Ingridients = ingridients);
  }

}
