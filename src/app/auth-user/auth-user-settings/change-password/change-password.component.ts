import {Component, OnInit} from "@angular/core";
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordMatch} from "../../../modules/auth/services/client/password-validator";
import {UserRestService} from "../../../modules/auth/services/rest/user-rest.service";
import {AuthService} from "../../../modules/auth/services/client/auth.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm!: FormGroup;

  constructor(
    private fbPassword: FormBuilder,
    private userRestService: UserRestService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const options: AbstractControlOptions = {
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
