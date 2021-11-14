import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
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

  // public getUsers(){
  //   let username = "222@qweqwe.com"
  //   let password = "12345678"
  //   const headers = new HttpHeaders({Authotization: "Basic "+ btoa(username+":"+password)})
  //   return this.http.get("http://localhost:8081/users/getUsers",{headers,responseType:"text"as "json"});
  // }
}
