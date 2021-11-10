import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginForm} from "../../models/login-form.model";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(private http: HttpClient) { }


  public login (body: LoginForm) : Observable<any>{
    return this.http.post(appLinks.login, body);
  }

  public recover (body: LoginForm) : Observable<any>{
    return this.http.post(appLinks.recovery, body);
  }

}
