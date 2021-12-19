import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/services/client/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRestService} from "../../auth/services/rest/user-rest.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  public firstname: string = "";
  public lastname: string = "";
  public form: FormGroup = this.personalInformationForm();

  constructor(
    private authService: AuthService,
    private userRestService: UserRestService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit(): void {
    this.firstname = this.authService.getUserFirstname();
    this.lastname = this.authService.getUserLastname();
  }

  savePersonalInformation(): void {
    if (this.form.valid)
      this.userRestService.updatePersonalInformation(this.form.value).subscribe(
        () => {
        this.authService.setUserFirstname(this.firstname);
        this.authService.serUserLastname(this.lastname);
        this.notification.success("Personal information changed", "");
        },
        () => {
          this.notification.error("Failed to change personal information", "");
      });
  }

  private personalInformationForm(): FormGroup {
    return this.formBuilder.group({
      id: this.authService.getUserId(),
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]]
    });
  }

}
