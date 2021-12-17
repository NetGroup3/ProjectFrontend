import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordMatch} from "../../auth/services/client/password-validator";
import {AuthService} from "../../auth/services/client/auth.service";
import {UserRestService} from "../../auth/services/rest/user-rest.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public passwordForm!: FormGroup;

  constructor(private authService: AuthService,
              private userRestService: UserRestService,
              private fbPassword: FormBuilder,
              private notification: NzNotificationService) {
  }

  ngOnInit(): void {
    const
      options: AbstractControlOptions = {
        validators: PasswordMatch.matchingPasswords
      }

    this.passwordForm = this.fbPassword.group({
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]]
      }, options
    );
  }

  public onSavePasswordClick(): void {
    if (this.passwordForm.valid) {
      this.userRestService.changePassword(this.passwordForm.value).subscribe({
        next: (): void => {
          this.notification.blank('Password changed', '', {});
        },
        error: (error: HttpErrorResponse): void => {
          this.notification.blank(error.error, '', {});
        }
      });
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

}
