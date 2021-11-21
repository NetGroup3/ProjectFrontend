import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRestService} from "../../modules/auth/services/rest/user-rest.service";
import {AuthService} from "../../modules/auth/services/client/auth.service";

// In your component.ts use `@cloudinary/url-gen` to generate your transformations.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";


@Component({
  selector: 'app-auth-user-settings',
  templateUrl: './auth-user-settings.component.html',
  styleUrls: ['./auth-user-settings.component.scss']
})
export class AuthUserSettingsComponent implements OnInit {
  public firstname: string = "";
  public lastname: string = "";
  public form: FormGroup = this.buildForm();

  public img: CloudinaryImage = this.initImage();

  constructor(private fb: FormBuilder, private userRestService :UserRestService, private authService: AuthService) { }

  ngOnInit(): void {
    this.firstname = this.authService.getUserFirstname();
    this.lastname = this.authService.getUserLastname();

  }

  initImage(): CloudinaryImage {
    // Create and configure your Cloudinary instance.
    const cld = new Cloudinary({cloud: {cloudName: 'demo'}});

    // Use the image with public ID, 'front_face'.
    return  cld.image('front_face')
      .resize(thumbnail().width(300).height(300))
      .roundCorners(byRadius(20));
  }

  save(): void {
    if(this.form.valid)
    this.userRestService.updatePersonalInformation(this.form.value).subscribe((response: any) => {
      console.log(this.form.value)
      console.log(response)
      this.authService.setUserFirstname(this.firstname);//исправить данную неточность
      this.authService.serUserLastname(this.lastname);
    })
  }

  private buildForm():FormGroup {
    return this.fb.group({
      id: this.authService.getUserId(),
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]]
    });
  }
}
