import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {StockService} from "../../../core/services/stock.service";
import {Ingredient} from "../../../core/models/ingredient";
import {StockAddDto} from "../../../core/models/StockAddDto";
import {UiService} from "../../../core/services/ui.service";
import {Subscription} from "rxjs";
import {StockStorageService} from "../stock-storage.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {Stock} from "../../../core/models/stock";

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit, OnChanges {

  @Output() onAddStock: EventEmitter<Stock> = new EventEmitter<Stock>();
  @Input() ingredient!: Ingredient;

  public selectedIngredient!: Ingredient;
  public amount: number = 0;

  public ingredients: Ingredient[] = [];
  public showAddStock: boolean = false;
  public subscription!: Subscription;

  constructor(
    private stockService: StockService,
    private uiService: UiService,
    public stockStorageService: StockStorageService,
    private notification: NzNotificationService,
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddStock = value));
  }

  ngOnInit(): void {
    this.stockStorageService.getIngredients();
  }

/*  getIngredients(): void {
    this.stockService.getIngredients(this.limit, this.page)
      .subscribe((ingredients: Ingredient[]) =>{
        this.stockStorageService.ingredients = ingredients;
      });
  }*/

/*  loadMore() {
    if (this.isLoading){
      return;
    }
    this.isLoading = true;
    this.page++;
    this.stockService.getIngredients(this.limit, this.page)
      .subscribe(data => {
        this.isLoading = false;
        this.ingredients = [...this.ingredients, ...data];
      });
  }*/

  onSubmit(){
    if(!this.amount){
      this.notification.warning("Please add amount!", "");
      return;
    }
    const stock: Stock = {
      ingredient: this.selectedIngredient,
      amount: this.amount,
    }
    this.onAddStock.emit(stock);
    this.ingredients = this.ingredients.filter(ingredient=>ingredient.id!==this.selectedIngredient.id);
    this.amount = 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.ingredient){
      this.ingredients.push(this.ingredient);
    }
  }

}
