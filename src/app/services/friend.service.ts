import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../app.links";


@Injectable({
  providedIn: 'root'
})
export class FriendService{

  constructor(private http: HttpClient) {
  }
  public getFriends(limit: number, offset: number) : Observable<any>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    console.log('link: ',params);
    return this.http.get(appLinks.friends, {params});
  }

  public deleteFriend(id: number){
    console.log( this.http.delete(appLinks.delFriend, {
      params: new HttpParams().set('id', id)
    }))
    return this.http.delete(appLinks.delFriend, {
      params: new HttpParams().set('id', id)
    });
  }

  public getRequests(limit: number, offset: number) : Observable<any>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', offset.toString());
    return this.http.get(appLinks.requests, {params});
  }

  public declineInvite(id: number){
    console.log( this.http.delete(appLinks.declineInvite, {
      params: new HttpParams().set('id', id)
    }))
    return this.http.delete(appLinks.declineInvite, {
      params: new HttpParams().set('id', id)
    });
  }

  public acceptInvite(id: number){
    return this.http.put(appLinks.acceptInvite, undefined,{
      params: new HttpParams().set('id', id)
    });
  }

}
