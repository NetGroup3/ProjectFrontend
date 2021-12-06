import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {StockService} from "../../../core/services/stock.service";
import {Ingredient} from "../../../core/models/ingredient";
import {StockAddDto} from "../../../core/models/StockAddDto";
import {UiService} from "../../../core/services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit, OnChanges {

  private limit: number = 50;
  private page: number = 0;

  @Output() onAddStock: EventEmitter<StockAddDto> = new EventEmitter<StockAddDto>();
  @Input()   ingredient!: Ingredient;

  selectedIngredientId: number = 0;
  amount: number = 0;

  ingredients: Ingredient[] = [];
  showAddStock: boolean = false;
  subscription!: Subscription;

  constructor(
    private stockService: StockService,
    private uiService: UiService,
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddStock = value));
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if(this.ingredient){
      this.ingredients.push(this.ingredient);
    }
  }

}
