import {Component, OnInit, HostListener} from '@angular/core';
import {StockService} from "../../core/services/stock.service";
import {Subscription} from "rxjs";
import {Stock} from "../../core/models/stock";
import {Ingredient} from "../../core/models/ingredient";
import {StockAddDto} from "../../core/models/StockAddDto";
import {UiService} from "../../core/services/ui.service";

@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  public ingredient!: Ingredient;

  public showAddStock: boolean = false;
  public subscription!: Subscription;

  private limit: number = 10;
  private page: number = 0;
  private pages: number = 0;
  private searchText: string = "";
  public category: string = "";
  public sortedBy: string = "";

  public isLoading = false;

  public stocks: Stock[] = [];
  public selectedIngredientId: number = 0;
  public amount: number = 0;

  constructor(
    private stockService: StockService,
    private uiService: UiService,
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddStock = value));
  }

  ngOnInit(): void {
    this.getData();
    this.getPages();
  }

  getPages(): void {
    this.stockService.getPages(this.limit).subscribe( (pages: number) => {
      this.pages = pages;
    });
  }

  getData(): void {
    if (this.isLoading){
      return;
    }
    this.isLoading = true;
    this.stockService
      .getStocks(this.limit, this.page)
      .subscribe((stocks: Stock[]) => {
        this.stocks = stocks;
        this.isLoading = false;
        this.page++;
      });
  }

  onLoadMore(): void {
    if (this.isLoading || this.page===this.pages){
      return;
    }
    this.isLoading = true;
    this.stockService.getStocks(this.limit, this.page)
      .subscribe(data => {
      this.isLoading = false;
      this.stocks = [...this.stocks, ...data];
      this.page++;
    });
  }

  delete(stock: Stock) {
    const id: number = stock.id
    this.stockService.delete(stock.ingredient.id).subscribe(()=> {
      this.stocks = this.stocks.filter(stock=>stock.id!==id);
      this.ingredient = stock.ingredient;
    });
  }

  change(stock: Stock) {
    this.stockService.update(stock.ingredient.id, stock.amount).subscribe();
  }

  addStock(stockAdd: StockAddDto): void {
    this.stockService.create(stockAdd).subscribe((res: Stock)=> {
      this.stocks.push(res);
    });
  }

  toggleAddStock() {
    this.uiService.toggleAddStock();
  }

  upSearch(value: string) {
    this.searchText = value
    if(this.isLoading){
      return;
    }
    this.isLoading = true;
    this.page = 0;
    this.stockService.search(
      this.limit,
      this.page,
      this.searchText,
      this.category,
      this.sortedBy
    ).subscribe((res: Stock[])=> {
      this.isLoading = false;
      this.stocks = res;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    if(pos == document.documentElement.scrollHeight )   {
      this.onLoadMore();
    }
  }

}
