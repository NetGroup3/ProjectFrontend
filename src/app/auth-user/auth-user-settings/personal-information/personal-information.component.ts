import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../modules/auth/services/client/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserRestService} from "../../../modules/auth/services/rest/user-rest.service";

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  public firstname: string = "";
  public lastname: string = "";
  public form: FormGroup = this.personalInformationForm();
  constructor(private authService: AuthService, private userRestService: UserRestService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.firstname = this.authService.getUserFirstname();
    this.lastname = this.authService.getUserLastname();
  }

  savePersonalInformation(): void {
    if (this.form.valid)
      this.userRestService.updatePersonalInformation(this.form.value).subscribe((response: any) => {
        console.log(this.form.value)
        console.log(response)
        this.authService.setUserFirstname(this.firstname);
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

}