import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {User} from "../../../../models/user";

@Injectable({
  providedIn: 'root'
})

export class UserRestService {
  constructor(private http: HttpClient) { }

  public updatePersonalInformation(body: User): Observable<any>{
    return this.http.put(appLinks.personalInfo, body);
  }

  upLoadImage(data: FormData): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/djcak19nu/image/upload', data);
  }
}
