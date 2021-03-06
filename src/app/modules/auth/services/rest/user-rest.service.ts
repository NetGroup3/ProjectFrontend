import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../../app.links";
import {User} from "../../../core/models/user";
import {ChangePasswordForm} from "../../models/change-password-form.model";

@Injectable({
  providedIn: 'root'
})

export class UserRestService {
  constructor(private http: HttpClient) { }

  public updatePersonalInformation(body: User){
    return this.http.put(appLinks.personalInfo, body);
  }

  updateImage(body: User) {
    return this.http.put(appLinks.userImage, body);
  }

  public changePassword (body: ChangePasswordForm) {
    return this.http.put(appLinks.changePassword, body);
  }

}
