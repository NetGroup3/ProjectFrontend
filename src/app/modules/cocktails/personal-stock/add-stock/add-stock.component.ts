import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StockService} from "../../../core/services/stock.service";
import {Ingredient} from "../../../core/models/ingredient";
import {StockAddDto} from "../../../core/models/StockAddDto";
import {UiService} from "../../../core/services/ui.service";
import {Subscription} from "rxjs";
import {StoreStockService} from "../store-stock.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit, OnChanges {

  private isLoading = false;
  private limit: number = 10;
  private page: number = 0;

  @Output() onAddStock: EventEmitter<StockAddDto> = new EventEmitter<StockAddDto>();
  @Input()   ingredient!: Ingredient;

  selectedIngredientId: number = 0;
  amount: number = 0;

  showAddStock: boolean = false;
  subscription!: Subscription;

  constructor(
    private stockService: StockService,
    private uiService: UiService,
    private notification: NzNotificationService,
    public storeStockService: StoreStockService
  ) {
    this.subscription = this.uiService
      .onShowAddStock()
      .subscribe(value => (this.showAddStock = value));
  }

  ngOnInit(): void {
    this.getIngredients();
  }

  getIngredients(): void {
    this.stockService
      .getIngredients(this.limit, this.page)
      .subscribe((ingredients: Ingredient[])=>{
        this.storeStockService.ingredients = ingredients;
        });
  }

  loadMore() {
    if (this.isLoading){
      return;
    }
    this.isLoading = true;
    this.page++;
    this.stockService.getIngredients(this.limit, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.storeStockService.ingredients = [...this.storeStockService.ingredients, ...data];
      });
  }

  onSubmit(){
    if(!this.amount){
      this.notification.error("Please add amount!", "");
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
      this.storeStockService.ingredients.push(this.ingredient);
    }
  }

}
