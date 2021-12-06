import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../core/services/message.service";
import {StockService} from "../../core/services/stock.service";
import {catchError} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {StockModel} from "../../core/models/stock.model";
import {Ingredient} from "../../core/models/ingredient";
import {StockAddDto} from "../../core/models/StockAddDto";
import {UiService} from "../../core/services/ui.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  showAddStock: boolean = false;
  subscription!: Subscription;

  limit: number = 20;
  page: number = 0;

  initLoading = true; // bug
  loadingMore = false;
  stocks: StockModel[] = [];
  show: boolean = true;
  ingredients: Ingredient[] = [];
  isLoading = false;
  selectedIngredientId: number = 0;
  amount: number = 0;


  constructor(
    private stockService: StockService,
    private msg: MessageService,
    private uiService: UiService,
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddStock = value));
  }

  ngOnInit(): void {
    this.getData((res: any) => {
      console.log(res)
      this.stocks = res;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.stockService
      .getStocks(this.limit, this.page)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));
  }


  onLoadMore(): void {
    console.log("load more stock");
  }

  edit(item: any): void {
    this.msg.success(item.title);
    this.show = !this.show;
  }

  delete(stock: StockModel) {
    const id: number = stock.id
    this.stockService.delete(stock.ingredient.id).subscribe((res: any)=> {
      console.log(res)
      this.stocks = this.stocks.filter(stock=>stock.id!==id);
//      this.addStockComponent.addIngredient(stock.ingredient);
    });
  }

  change(stock: StockModel) {
    this.stockService.update(stock.ingredient.id, stock.amount).subscribe();
  }

  addStock(stockAdd: StockAddDto): void {
    this.stockService.create(stockAdd).subscribe((res: StockModel)=> {
      console.log(res)
      this.stocks.push(res);
      this.ingredients = this.ingredients.filter(ingredient=>ingredient.id!==this.selectedIngredientId);
    });
  }

  toggleAddStock() {
    this.uiService.toggleAddStock();
  }


}
