import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {
  }

  public getData(limit: number, page: number): Observable<any> {
    return this.http.get(appLinks.stock, {
      params: new HttpParams().set('limit', limit).set('page', page)
    });
  }

/*  delete(id: number) {
    return this.http.delete(appLinks.stock, {
      params: new HttpParams().set('id', id)
    });
  }*/

  delete(ingredient: string) {
    return this.http.delete(appLinks.stock, {
      params: new HttpParams().set('ingredient', ingredient)
    });
  }

  create(ingredient: string, amount: number){
    return this.http.post(appLinks.stock, {
      params: new HttpParams().set('ingredient', ingredient).set('amount', amount)
    });
  }

  update(ingredient: string, amount: number){
    return this.http.patch(appLinks.stock, {
      params: new HttpParams().set('ingredient', ingredient).set('amount', amount)
    });
  }

}

