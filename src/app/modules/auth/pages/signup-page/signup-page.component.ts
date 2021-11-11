import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegistrationRestService} from "../../services/rest/registration-rest.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registrationRestService: RegistrationRestService
  ) { }

  ngOnInit(): void {
  }

  public form: FormGroup = this.buildForm();

  public onLoginClick(): void {
    if (this.form.valid) {
      this.registrationRestService.addUser(this.form.value).subscribe((response: any) => {
        console.log(response)
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.email],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

}
