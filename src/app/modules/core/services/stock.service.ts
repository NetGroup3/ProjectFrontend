import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../app.links";
import {StockModel} from "../models/stock.model";
import {StockAddDto} from "../models/StockAddDto";
import {Ingredient} from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {
  }

  public getStocks(limit: number, page: number): Observable<StockModel[]> {
    return this.http.get<StockModel[]>(appLinks.stock, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }

  delete(id: number) {
    return this.http.delete(appLinks.stock, {
      params: new HttpParams().set('ingredientId', id)
    });
  }

  create(stockAdd: StockAddDto): Observable<StockModel>{
    return this.http.post<StockModel>(appLinks.stock, stockAdd);
  }

/*  update(stock: StockAddDto){
    return this.http.patch(appLinks.stock, stock)
  }*/

  update(id: number, amount: number): Observable<StockModel>{
    const stockAddDto: StockAddDto = {
      ingredientId: id,
      amount: amount
    }
    return this.http.patch<StockModel>(appLinks.stock, stockAddDto);
  }

  public getIngredients(limit: number, page: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(appLinks.stockIngredients, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }
}

