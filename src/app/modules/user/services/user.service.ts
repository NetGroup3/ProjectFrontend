import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {appLinks} from "../../../app.links";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(name: string): Observable<any> {
    const params = new HttpParams()
      .set('name', name);
    return this.http.get(appLinks.userSearch, {params});
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(appLinks.userProfile + '/' + id);
  }

  public addFriend(id: number): Observable<any> {
    const params = new HttpParams()
      .append('id', JSON.stringify(id));
    return this.http.post(appLinks.addFriend, id,{params});
  }

}
