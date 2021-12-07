import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {appLinks} from "../../../app.links";

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {

  constructor(private http: HttpClient) {
  }

  public getUsers(name: string): Observable<any> {
    const params = new HttpParams()
      .set('name', name.toString());
    return this.http.get(appLinks.friends, {params});
  }


}
