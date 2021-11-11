import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SignupForm} from "../../models/signup-form.model";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";

@Injectable({
  providedIn: 'root'
})
export class RegistrationRestService {

  constructor(private http: HttpClient) {}

  // public signUp(body: LoginForm): Observable<any> {
  //   return this.http.post(appLinks.signup, body);
  // }

  public addUser(body: SignupForm) : Observable<any>{
    return this.http.post(appLinks.users, body);
  }
}
