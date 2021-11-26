import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {User} from "../../../../models/user";
import { ChangePasswordForm } from "../../models/change-password-form.model";
import {UserId} from "../../models/user-id";

@Injectable({
  providedIn: 'root'
})

export class UserRestService {
  constructor(private http: HttpClient) { }

  public updatePersonalInformation(body: User): Observable<any>{
    return this.http.put(appLinks.personalInfo, body);
  }

  updateImage(body: User) {
    return this.http.put(appLinks.userImage, body);
  }

  public changePassword (body: ChangePasswordForm): Observable<any>{
    return this.http.put(appLinks.changePassword, body);
  }

}
