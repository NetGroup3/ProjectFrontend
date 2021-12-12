import {Component, OnInit, HostListener} from '@angular/core';
import {StockService} from "../../core/services/stock.service";
import {Subscription} from "rxjs";
import {Stock} from "../../core/models/stock";
import {Ingredient} from "../../core/models/ingredient";
import {StockAddDto} from "../../core/models/StockAddDto";
import {UiService} from "../../core/services/ui.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {StockStorageService} from "./stock-storage.service";

@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  public ingredient!: Ingredient;

  public showAddStock: boolean = false;
  public subscription!: Subscription;

  private limit: number = 11;
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
    private notification: NzNotificationService,
    public stockStorageService: StockStorageService,
  ) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => (this.showAddStock = value));
  }

  ngOnInit(): void {
    this.getData();
    this.getPages();
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
    this.stockService.search(
      this.limit,
      this.page,
      this.searchText,
      this.category,
      this.sortedBy
    ).subscribe((stocks: Stock[]) => {
     //   this.stocks = stocks;
      this.stockStorageService.stocks = stocks;
        this.isLoading = false;
        this.page++;
      },
      () => {
        this.notification.error("Failed to load data from server", "");
      });
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
    ).subscribe((stocks: Stock[]) => {
      this.isLoading = false;
      this.stocks = [...this.stocks, ...stocks];
      this.page++;
      },
      () => {
        this.notification.error("Failed to load data from server", "");
    });
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
    ).subscribe((stocks: Stock[])=> {
      this.isLoading = false;
      this.stocks = stocks;
      this.page++;
      },
      () => {
        this.notification.error("Failed to load data from server", "");
    });
  }

  delete(stock: Stock) {
    this.stockService.delete(stock.ingredient.id).subscribe(
      ()=> {
      this.stocks = this.stocks.filter(stock=>stock.id!==stock.id);
      this.notification.blank(stock.ingredient.title + " successfully removed from your stock", "");
      this.ingredient = stock.ingredient;
    },
      error => {
        this.notification.blank(stock.ingredient.title + " successfully removed from your stock", "");
      });
  }

  change(stock: Stock) {
    this.stockService.update(stock.ingredient.id, stock.amount).subscribe(()=>{
      this.notification.blank("Stock  " + stock.ingredient.title + " changed", "");
      },
      () => {
        this.notification.error("Failed to load data from server", "");
    });
  }

  addStock(stock: Stock): void {
    this.stockService.create(stock).subscribe((stock: Stock)=> {
      this.stockStorageService.stocks.push(stock);

      this.notification.blank("You successfully added ingredient to your stock", "");
      },
      () => {
        this.notification.error("Failed to load data from server", "");
    });
  }

  toggleAddStock() {
    this.uiService.toggleAddStock();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    if(pos == document.documentElement.scrollHeight )   {
      this.onLoadMore();
    }
  }

}
