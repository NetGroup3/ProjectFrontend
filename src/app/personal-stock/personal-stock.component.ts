import {Component, OnInit} from '@angular/core';
import {MessageService} from "../services/message.service";
import {StockService} from "../modules/auth/services/rest/stock.service";
import {catchError} from "rxjs/operators";
import {of} from "rxjs";
import {AuthService} from "../modules/auth/services/client/auth.service";
import {StockModel} from "../modules/auth/models/stock.model";

@Component({
  selector: 'app-personal-stock',
  templateUrl: './personal-stock.component.html',
  styleUrls: ['./personal-stock.component.scss']
})
export class PersonalStockComponent implements OnInit {

  initLoading = true; // bug
  loadingMore = false;
  data: StockModel[] = [];

  constructor(
    private stockService: StockService,
    private msg: MessageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getData((res: any) => {
      console.log(res)
      this.data = res;
      this.initLoading = false;
    });
  }

  getData(callback: (res: any) => void): void {
    this.stockService
      .getData(this.authService.getUserId())
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => callback(res));
  }

  onLoadMore(): void {
/*    this.loadingMore = true;
    this.list = this.data.concat([...Array(count)].fill({}).map(() => ({ loading: true, name: {} })));
    this.stockService
      .getData(this.authService.getUserId())
      .pipe(catchError(() => of({ results: [] })))
      .subscribe((res: any) => {
        this.data = this.data.concat(res.results);
        this.list = [...this.data];
        this.loadingMore = false;
      });*/
  }

  edit(item: any): void {
    this.msg.success(item.title);
  }

}
