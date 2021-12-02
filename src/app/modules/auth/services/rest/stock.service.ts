import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {StockAddDto} from "../../../../models/stock-add-dto";


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getData(limit: number, page: number): Observable<any> {
    return this.http.get(appLinks.stock, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }

  public delete(id: number) {
    return this.http.delete(appLinks.stock, {
      params: new HttpParams().set('ingredientId', id)
    });
  }

  public create(stockAddDto: StockAddDto) {
    return this.http.post(appLinks.stock, stockAddDto);
  }

  public update(id: number, amount: number){
    return this.http.patch(appLinks.stock, {
      params: new HttpParams().set('ingredientId', id).set('amount', amount)
    });
  }

  public getIngredients(limit: number, page: number): Observable<any> {
    return this.http.get(appLinks.stockIngredients, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }
}

