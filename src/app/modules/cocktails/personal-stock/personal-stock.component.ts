import {Component, OnInit} from '@angular/core';
import {StockService} from "../../core/services/stock.service";
import {Subscription} from "rxjs";
import {Stock} from "../../core/models/stock";
import {Ingredient} from "../../core/models/ingredient";
import {StockAddDto} from "../../core/models/StockAddDto";
import {UiService} from "../../core/services/ui.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {StoreStockService} from "../../core/services/store-stock.service";

@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  public ingredient!: Ingredient;

  public showAddStock: boolean = false;
  public showRecommendDish: boolean = false;
  public subscription!: Subscription;

  private limit: number = 10;
  private page: number = 0;
  private pages: number = 0;
  private searchText: string = "";
  public category: string = "";
  public sortedBy: string = "";

  public isLoading = false;

  public selectedIngredientId: number = 0;
  public amount: number = 0;

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
    this.getStock();
    this.getPages();
  }

  getStock(){
    this.isLoading = true;
    this.stockService.search(
      this.limit,
      this.page,
      this.searchText,
      this.category,
      this.sortedBy
    ).subscribe(
      (stocks: Stock[])=> {
        this.isLoading = false;
        this.storeStockService.stocks = stocks;
        this.page++;
      },
      () => {
        this.notification.error("Failed to download stocks", "");
        this.isLoading = false;
      });
  }

  getPages(): void {
    this.stockService.getPages(this.limit).subscribe(
      (pages: number) => {
        this.pages = pages;
      });
  }

  sortedByTitle(){
    this.sortedBy = "title";
    this.upSearch("")
  }

  sortedByDescription() {
    this.sortedBy = "description";
    this.upSearch("")
  }

  sortedByCategory() {
    this.sortedBy = "category";
    this.upSearch("")
  }

  sortedByAmount() {
    this.sortedBy = "amount";
    this.upSearch("")
  }

  upSearch(value: string) {
    this.searchText = value
    if(this.isLoading){
      return;
    }
    this.page = 0;
    this.getStock();
  }

  onLoadMore(): void {
    if (this.isLoading || this.page===this.pages){
      return;
    }
    this.isLoading = true;
    this.stockService.search(
      this.limit,
      this.page,
      this.searchText,
      this.category,
      this.sortedBy
    ).subscribe(
      (stocks: Stock[]) => {
      this.isLoading = false;
      this.storeStockService.stocks = [...this.storeStockService.stocks, ...stocks];
      this.page++;
      },
      () => {
        this.notification.error("Failed to download stocks", "");
        this.isLoading = false;
      });
  }

  delete(stock: Stock) {
    const id: number = stock.id
    this.stockService.delete(stock.ingredient.id).subscribe(
      () => {
      this.storeStockService.stocks = this.storeStockService.stocks.filter(stock=>stock.id!==id);
      this.notification.success(stock.ingredient.title + " successfully removed from your stock", "")
      if(stock.ingredient.active) {
        this.ingredient = stock.ingredient;
      }
      if(this.storeStockService.stocks.length < this.limit){
        this.onLoadMore();
      }
      },
      () => {
        this.notification.error("Failed to delete " + stock.ingredient.title, "");
    });
  }

  change(stock: Stock) {
    this.stockService.update(stock.ingredient.id, stock.amount).subscribe(
      ()=>{
      this.notification.success("Stock  " + stock.ingredient.title + " changed", "")
      },
      () => {
        this.notification.error("Failed to change stock", "");
    });
  }

  addStock(stockAdd: StockAddDto): void {
    this.stockService.create(stockAdd).subscribe(
      (stock: Stock)=> {
      this.storeStockService.stocks.push(stock);
      this.storeStockService.ingredients = this.storeStockService.ingredients.filter(
        ingredient=>ingredient.id!==stockAdd.ingredientId);
      this.getPages();
      this.notification.success("You successfully added ingredient to your stock", "")
      },
      () => {
        this.notification.error("Failed to add ingredient to your stock", "");
    });
  }

  toggleAddStock() {
    this.uiService.toggleAddStock();
  }

  toggleRecommendDish() {
    this.showRecommendDish=!this.showRecommendDish;
  }

}
