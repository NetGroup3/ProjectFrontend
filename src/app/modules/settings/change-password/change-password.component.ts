import {Component, OnInit} from '@angular/core';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordMatch} from "../../auth/services/client/password-validator";
import {AuthService} from "../../auth/services/client/auth.service";
import {UserRestService} from "../../auth/services/rest/user-rest.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

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
        // userId: this.authService.getUserId(),
        oldPassword: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(128), Validators.minLength(8)]]
      }, options
    );
  }

  public onSavePasswordClick(): void {
    console.log(this.passwordForm.value.password)
    if (this.passwordForm.valid) {
      this.userRestService.changePassword(this.passwordForm.value).subscribe((response: any) => {
        this.notification.blank('Password changed', '', {
          nzKey: 'key'
        });
      })
      this.notification.blank('Incorrect password', '', {
        nzKey: 'key'
      });
    } else {
      this.passwordForm.markAllAsTouched();

    }
  }

}
