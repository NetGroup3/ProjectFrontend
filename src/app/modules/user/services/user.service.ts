import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {appLinks} from "../../../app.links";
import {UserSearch} from "../models/user-search";
import {UserProfile} from "../models/user-profile";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public getUsers(name: string): Observable<UserSearch[]> {
    const params = new HttpParams()
      .set('name', name);
    return this.http.get<UserSearch[]>(appLinks.userSearch, {params});
  }

  public getUser(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(appLinks.userProfile + '/' + id);
  }

  public addFriend(id: number) {
    const params = new HttpParams()
      .append('id', JSON.stringify(id));
    return this.http.post(appLinks.addFriend, id,{params});
  }

}
