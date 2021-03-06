import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoginForm} from "../../models/login-form.model";
import {RecoveryForm} from "../../models/recovery-form.model";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {SignupForm} from "../../models/signup-form.model";
import {UserLoginModel} from "../../models/user-login.model";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(private http: HttpClient) { }


  public login (body: LoginForm) : Observable<UserLoginModel>{
    return this.http.post<UserLoginModel>(appLinks.login, body);
  }

  public recover (body: RecoveryForm) : Observable<any>{
    return this.http.post(appLinks.recovery, body);
  }

  public signUp(body: SignupForm) : Observable<any>{
    return this.http.post(appLinks.signup, body);
  }

  public code (param: string):Observable<any>{
    return this.http.get(appLinks.code, {
      params: new HttpParams().set('param', param)
    });
  }

}
