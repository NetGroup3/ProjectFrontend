import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {AuthService} from "../../auth/services/client/auth.service";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService) {
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
    localStorage.clear();
    this.goToLogIn();
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
      .resize(thumbnail().width(50).height(50))
      .roundCorners(byRadius(25));
  }

  get userType() {
    return this.authService.getUserRole();
  }

  goToLogIn() {
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
