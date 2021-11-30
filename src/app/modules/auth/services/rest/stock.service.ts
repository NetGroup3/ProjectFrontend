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

  public getData(userId: string): Observable<any> {
    return this.http.get(appLinks.stock + '/' + userId);
  }

/*  public getData(userId: string): Observable<any>{
    return this.http.get(appLinks.stock+'/'+userId, {
      params: new HttpParams().set('userId', userId)
    });
  }*/

}

