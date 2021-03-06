import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../app.links";
import {Stock} from "../models/stock";
import {StockAddDto} from "../models/StockAddDto";
import {Ingredient} from "../models/ingredient";
import {DishFormat} from "../models/dishFormat";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {
  }

  public getStocks(limit: number, page: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(appLinks.stock, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }

  public search(limit: number, page: number, key: string, category: string, sortedBy: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(appLinks.stockSearch, {
      params: new HttpParams()
        .set('limit', limit)
        .set('page', page)
        .set('key', key)
        .set('category', category)
        .set('sortedBy', sortedBy)
    });
  }

  delete(id: number) {
    return this.http.delete(appLinks.stock, {
      params: new HttpParams().set('ingredientId', id)
    });
  }

  create(stockAdd: StockAddDto): Observable<Stock>{
    return this.http.post<Stock>(appLinks.stock, stockAdd);
  }

  update(id: number, amount: number): Observable<Stock>{
    const stockAddDto: StockAddDto = {
      ingredientId: id,
      amount: amount
    }
    return this.http.patch<Stock>(appLinks.stock, stockAddDto);
  }

  public getIngredients(limit: number, page: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(appLinks.stockIngredients, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }

  getPages(limit: number): Observable<number> {
    return this.http.get<number>(appLinks.stockPages, {
      params: new HttpParams().set('limit', limit)
    });
  }

  getRecommendDishes(limit: number, page: number): Observable<DishFormat[]>{
    return this.http.get<DishFormat[]>(appLinks.recommendDish, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }
}

