import {Component, OnInit} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {RegistrationRestService} from "../../services/rest/registration-rest.service";
import {PasswordMatch} from "../../services/client/password-validator";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private registrationRestService: RegistrationRestService
  ) {
  }

  public form!: FormGroup;

  ngOnInit(): void {
    const options: AbstractControlOptions = {
      validators: PasswordMatch.matchingPasswords
    }

    this.form = this.fb.group({
        email: ['', [Validators.email]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]]
      }, options
    )
  }

  public onLoginClick(): void {
    if (this.form.valid) {
      this.registrationRestService.addUser(this.form.value).subscribe((response: any) => {
        console.log(response)
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

}
