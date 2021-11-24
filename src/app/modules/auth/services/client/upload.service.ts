import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor( private http: HttpClient) {}

  upLoadImage(data: FormData): Observable<any> {
    return this.http.post('https://api.cloudinary.com/v1_1/djcak19nu/upload', data);
  }
}
