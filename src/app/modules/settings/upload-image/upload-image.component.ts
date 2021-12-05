import { Component, OnInit } from '@angular/core';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/services/client/auth.service";
import {UserRestService} from "../../auth/services/rest/user-rest.service";
import {UploadService} from "../../auth/services/client/upload.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  public imageId: string = "";
  public img: CloudinaryImage = this.initImage();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userRestService: UserRestService,
    private uploadService: UploadService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.imageId = this.authService.getImageId();
    this.img = this.initImage();
  }

  initImage(): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.imageId)
      .resize(thumbnail().width(300).height(300))
      .roundCorners(byRadius(20));
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response => {
      this.imageId = response.public_id;
      this.img = this.initImage();
      this.saveImageId();
    });
  }

  saveImageId(): void {
    this.userRestService.updateImage(this.imageForm().value).subscribe((response: any) => {
      this.authService.setImageId(this.imageId);
    })
  }

  /** form for send image Id to backend server*/
  private imageForm(): FormGroup {
    return this.fb.group({
      id: this.authService.getUserId(),
      imageId: this.imageId
    });
  }

  createBasicNotification(): void {
    this.notification.blank('Personal information changed', '', {
      nzKey: 'key'
    });
  }

}
