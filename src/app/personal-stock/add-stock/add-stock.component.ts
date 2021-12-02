import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../models/ingredient";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  limit: number = 20;
  page: number = 0;
  ingredients: Ingredient[] = [];
  isLoading = false;
  selectedIngredient = null;
  selectedIngredientId: number = 0;
  amount: number = 0;

  constructor() { }

  ngOnInit(): void {

  }

}
