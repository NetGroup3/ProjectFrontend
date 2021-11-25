import {Component, OnInit} from '@angular/core';

import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
//services
import {UserRestService} from "../../modules/auth/services/rest/user-rest.service";
import {AuthService} from "../../modules/auth/services/client/auth.service";
import {PasswordMatch} from "../../modules/auth/services/client/password-validator";

// In your component.ts use `@cloudinary/url-gen` to generate your transformations.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";


@Component({
  selector: 'app-auth-user-settings',
  templateUrl: './auth-user-settings.component.html',
  styleUrls: ['./auth-user-settings.component.scss'],
})
export class AuthUserSettingsComponent implements OnInit {

  public firstname: string = "";
  public lastname: string = "";
  private imageId: string = "";
  public form: FormGroup = this.personalInformationForm();
  public img: CloudinaryImage = this.initImage();
  files: File[] = [];
  public passwordForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fbPassword: FormBuilder,
    private userRestService: UserRestService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.firstname = this.authService.getUserFirstname();
    this.lastname = this.authService.getUserLastname();
    this.imageId = this.authService.getImageId();
    this.initImage();

    const
      options: AbstractControlOptions = {
        validators: PasswordMatch.matchingPasswords
      }

    this.passwordForm = this.fbPassword.group({
        userId: this.authService.getUserId(),
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]]
      }, options
    );
  }

  initImage(): CloudinaryImage {
    console.log(this.imageId);
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.imageId)
      .resize(thumbnail().width(300).height(300))
      .roundCorners(byRadius(20));
  }

  savePersonalInformation(): void {
    if (this.form.valid)
      this.userRestService.updatePersonalInformation(this.form.value).subscribe((response: any) => {
        console.log(this.form.value)
        console.log(response)
        this.authService.setUserFirstname(this.firstname);//исправить данную неточность
        this.authService.serUserLastname(this.lastname);
      })
  }

  private personalInformationForm(): FormGroup {
    return this.fb.group({
      id: this.authService.getUserId(),
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]]
    });
  }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
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
      console.log(response);
      this.imageId = response.public_id;
      console.log("imageId")
      console.log(this.imageId)
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

  /** Send image id to backend server */
  saveImageId(): void {
    this.userRestService.updateImage(this.imageForm().value).subscribe((response: any) => {
      console.log(this.imageForm().value)
      this.authService.setImageId(this.imageId);
      console.log(this.imageId)
      this.initImage();
    })
  }

  public onSavePasswordClick(): void {
    console.log(this.passwordForm.value.password)
    if (this.passwordForm.valid) {
      // console.log(this.passwordForm.value)
      this.userRestService.changePassword(this.passwordForm.value).subscribe((response: any) => {
        console.log(response)
      })
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }
}


