import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../auth/services/client/auth.service";
import {UserRestService} from "../../auth/services/rest/user-rest.service";
import {UploadService} from "../../auth/services/client/upload.service";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
              private userRestService: UserRestService,
              private uploadService: UploadService) {
  }

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";
  private readonly USER_ID: string = "USER_ID";
  private readonly USER_FIRSTNAME: string = "USER_FIRSTNAME";
  private readonly USER_LASTNAME: string = "USER_LASTNAME";
  private readonly USER_ROLE: string = "USER_ROLE";
  private readonly USER_IMAGE_ID: string = "USER_IMAGE_ID";
  public imageId: string = "";
  public img: CloudinaryImage = this.initImage();
  public firstname: string = "";
  public lastname: string = "";


  logOut() {
    localStorage.setItem(this.TOKEN_KEY, "");
    localStorage.setItem(this.USER_ID, "");
    localStorage.setItem(this.USER_FIRSTNAME, "");
    localStorage.setItem(this.USER_LASTNAME, "");
    localStorage.setItem(this.USER_ROLE, "");
    localStorage.setItem(this.USER_IMAGE_ID, "");
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.imageId = this.authService.getImageId();
    this.img = this.initImage();
    this.firstname = this.authService.getUserFirstname();
    this.lastname = this.authService.getUserLastname();
  }

  initImage(): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.imageId)
      .resize(thumbnail().width(40).height(40))
      .roundCorners(byRadius(20));
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

}
