import {Component, OnInit} from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {PasswordMatch} from "../../services/client/password-validator";
import {AuthRestService} from "../../services/rest/auth-rest.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  toggle: boolean = true;
  error: boolean = false;
  message: string = "";

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService
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
        password: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]],
        status: "NOT_VERIFY",
        role: "USER"
      }, options
    )
  }

  public onLoginClick(): void {
    this.resetMessage();
    if (this.form.valid) {
      this.authRestService.signUp(this.form.value).subscribe({
        error: (error:HttpErrorResponse): void => {this.messageError(error.error)},
        next: (): void => {
          this.toggle = false;
        },
      });
    } else {
      this.messageError("Fill in all the fields");
      this.form.markAllAsTouched();
    }

  }

  private resetMessage(): void {
    this.error = false;
  }

  private messageError(message : string) :void {
    this.message = message;
    this.error = true;
  }

}
