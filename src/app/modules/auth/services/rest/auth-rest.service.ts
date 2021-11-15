import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginForm} from "../../models/login-form.model";
import {RecoveryForm} from "../../models/recovery-form.model";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {SignupForm} from "../../models/signup-form.model";

@Injectable({
  providedIn: 'root'
})
export class AuthRestService {

  constructor(private http: HttpClient) { }


  public login (body: LoginForm) : Observable<any>{
    return this.http.post(appLinks.login, body);
  }

  public recover (body: RecoveryForm) : Observable<any>{
    return this.http.post(appLinks.recovery, body);
  }

  public signUp(body: SignupForm) : Observable<any>{
    return this.http.post(appLinks.signup, body);
  }
}
