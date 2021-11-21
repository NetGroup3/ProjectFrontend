import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {PersonalInformationForm} from "../../models/personal-information-form.model";
import { ChangePasswordForm } from "../../models/change-password-form.model";

@Injectable({
  providedIn: 'root'
})

export class UserRestService {
  constructor(private http: HttpClient) { }

  public updatePersonalInformation (body: PersonalInformationForm): Observable<any>{
    return this.http.put(appLinks.personalInfo, body);
  }

  public changePassword (body: ChangePasswordForm): Observable<any>{
    return this.http.put(appLinks.changePassword, body);
  }
}
