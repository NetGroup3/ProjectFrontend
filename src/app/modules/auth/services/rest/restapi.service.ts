import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appLinks} from "../../../../app.links";

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http:HttpClient) { }
  public login(username:string, password:string){

    const headers = new HttpHeaders({Authorization: btoa(username+":"+password)})
    console.log(headers)
    return this.http.get(appLinks.login,{headers, responseType: 'text' as 'json'});
  }

}
