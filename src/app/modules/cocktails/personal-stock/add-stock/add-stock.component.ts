import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {StockService} from "../../../../services/stock.service";
import {Ingredient} from "../../../models/ingredient";
import {StockAddDto} from "../../../models/StockAddDto";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  private limit: number = 50;
  private page: number = 0;

  @Output() onAddStock: EventEmitter<StockAddDto> = new EventEmitter<StockAddDto>();
  selectedIngredientId: number = 0;
  amount: number = 0;

  ingredients: Ingredient[] = [];

  constructor(
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.getIngredients((res: any) => {
      console.log(res)
      this.ingredients = res;
    });
  }

  getIngredients(callback: (res: any) => void): void {
    this.stockService
      .getIngredients(this.limit, this.page)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));
  }

  loadMore() {
    console.log("load more ingredient");
  }

  onSubmit(){
    if(!this.amount){
      alert("Please add amount!");
      return;
    }
    const stockAddDto: StockAddDto = {
      ingredientId: this.selectedIngredientId,
      amount: this.amount
    }
    this.onAddStock.emit(stockAddDto);
    this.selectedIngredientId = 0;
    this.amount = 0;
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
  }
}
