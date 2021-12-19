import {Component, OnInit} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen";
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

  public img: CloudinaryImage = this.initImage();
  private imageId: string = "";
  private imageWith = 300;
  private imageHeight = 300;

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
    return this.uploadService.initImageWithSize(this.imageId, this.imageWith, this.imageHeight);
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(
      response => {
      this.imageId = response.public_id;
      this.img = this.initImage();
      this.saveImageId();
      },
      () => {
        this.notification.error("Failed to change photo", "");
    });
  }

  saveImageId(): void {
    this.userRestService.updateImage(this.imageForm().value).subscribe(
      () => {
      this.authService.setImageId(this.imageId);
      this.notification.success('Photo changed', '');
      },
      () => {
        this.notification.error("Failed to change photo", "");
    });
  }

  /** form for send image Id to backend server*/
  private imageForm(): FormGroup {
    return this.fb.group({
      id: this.authService.getUserId(),
      imageId: this.imageId
    });
  }

}
