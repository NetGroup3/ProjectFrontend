import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../../app.links";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor( private http: HttpClient) {}

  public onUpLoad(file: File): Observable<any> {
    console.log("add file data")
    const file_data = file;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'ku2dutrm');
    data.append('cloud_name', 'djcak19nu');
   return this.http.post(appLinks.uploadImage, data);
  }

  initImage(imageId: string): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(imageId)
      .resize(thumbnail().width(200).height(200))
      .roundCorners(byRadius(20));
  }

}
