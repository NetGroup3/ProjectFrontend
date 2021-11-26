import { Component, OnInit } from '@angular/core';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../modules/auth/services/client/auth.service";
import {UserRestService} from "../../../modules/auth/services/rest/user-rest.service";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  public imageId: string = "";
  public img: CloudinaryImage = this.initImage();
  public files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userRestService: UserRestService,
  ) { }

  ngOnInit(): void {
    this.imageId = this.authService.getImageId();
    this.img = this.initImage();
  }

  initImage(): CloudinaryImage {
    console.log(this.imageId);
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.imageId)
      .resize(thumbnail().width(300).height(300))
      .roundCorners(byRadius(20));
  }

  onFileSelect($event: any) {
    this.files[0] = $event.target.files[0];
    this.onUpLoad();
  }

  onUpLoad() {
    if (!this.files[0]) {
      alert("you need to select image!")
    }
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'ku2dutrm');
    data.append('cloud_name', 'djcak19nu');
    this.userRestService.upLoadImage(data).subscribe(response => {
      this.imageId = response.public_id;
      this.saveImageId();
    });
  }

  /** form for send image Id to backend server*/
  private imageForm(): FormGroup {
    return this.fb.group({
      id: this.authService.getUserId(),
      imageId: this.imageId
    });
  }

  saveImageId(): void {
    this.userRestService.updateImage(this.imageForm().value).subscribe((response: any) => {
      this.authService.setImageId(this.imageId);
    })
    this.authService.setImageId(this.imageId)
    this.img = this.initImage();
    this.files = [];
  }

}
