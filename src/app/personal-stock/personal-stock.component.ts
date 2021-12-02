import {Component, OnInit} from '@angular/core';
import {MessageService} from "../services/message.service";
import {StockService} from "../modules/auth/services/rest/stock.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {StockModel} from "../modules/auth/models/stock.model";
import {Ingredient} from "../models/ingredient";
import {StockAddDto} from "../models/stock-add-dto";


@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  limit: number = 20;
  page: number = 0;
  initLoading = true; // bug
  loadingMore = false;
  data: StockModel[] = [];
  show: boolean = true;
  ingredients: Ingredient[] = [];
  isLoading = false;
  selectedIngredientId: number = 0;
  amount: number = 0;
  stockAdd: StockAddDto = {
    id: 0,
    amount: 0
  }

  constructor(
    private stockService: StockService,
    private msg: MessageService,
    ) { }

  ngOnInit(): void {
    this.getData((res: any) => {
      console.log(res)
      this.data = res;
      this.initLoading = false;
    });
    this.getIngredients((res: any) => {
      console.log(res)
      this.ingredients = res;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.stockService
      .getData(this.limit, this.page)
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));
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
      this.data = this.data.filter(stock=>stock.id!==id);
    });
  }

  addStock(): void {
    console.log(this.selectedIngredientId);
    console.log(this.amount);
    this.stockAdd.id = this.selectedIngredientId;
    this.stockAdd.amount = this.amount;
    this.stockService.create(this.stockAdd).subscribe((res: any)=> {
      console.log(res)
      this.ingredients = this.ingredients.filter(ingredient=>ingredient.id!==this.selectedIngredientId);
    });
  }
}
