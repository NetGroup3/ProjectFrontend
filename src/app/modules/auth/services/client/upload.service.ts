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

  private upload_preset: string = "ku2dutrm";
  private cloud_name: string = "djcak19nu";
  private defaultRadius: number = 20;
  private defaultWith: number = 200;
  private defaultHeight: number = 200;

  constructor( private http: HttpClient) {}

  public onUpLoad(file: File): Observable<any> {
    const file_data = file;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', this.upload_preset);
    data.append('cloud_name', this.cloud_name);
   return this.http.post(appLinks.uploadImage, data);
  }

  initImage(imageId: string): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: this.cloud_name}});
    return cld.image(imageId)
      .resize(thumbnail().width(this.defaultWith).height(this.defaultHeight))
      .roundCorners(byRadius(this.defaultRadius));
  }

  initImageWithSize(imageId: string, width: number, height: number): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: this.cloud_name}});
    return cld.image(imageId)
      .resize(thumbnail().width(width).height(height))
      .roundCorners(byRadius(this.defaultRadius));
  }

  initImageWithSizeAndRadius(imageId: string, width: number, height: number, radius: number): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: this.cloud_name}});
    return cld.image(imageId)
      .resize(thumbnail().width(width).height(height))
      .roundCorners(byRadius(radius));
  }

}
