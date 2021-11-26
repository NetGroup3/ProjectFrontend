import {Component, OnInit} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {PasswordMatch} from "../../services/client/password-validator";
import {AuthRestService} from "../../services/rest/auth-rest.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService
  ) {
  }

  public form!: FormGroup;
  toggle: boolean = true;

  ngOnInit(): void {
    const options: AbstractControlOptions = {
      validators: PasswordMatch.matchingPasswords
    }

    this.form = this.fb.group({
        email: ['', [Validators.email]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]],
        status: "NOT_VERIFY",
        role: "USER"
      }, options
    )
  }

  public onLoginClick(): void {
    if (this.form.valid) {
      this.authRestService.signUp(this.form.value).subscribe((response: any) => {
        console.log(response)
      })
      this.toggle = !this.toggle;
    } else {
      this.form.markAllAsTouched();
    }

  }

}
