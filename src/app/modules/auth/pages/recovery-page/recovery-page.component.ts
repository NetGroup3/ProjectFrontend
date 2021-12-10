import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthRestService} from "../../services/rest/auth-rest.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrls: ['./recovery-page.component.scss']
})
export class RecoveryPageComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  message: string = "";

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService
  ) {
  }

  public form: FormGroup = this.buildForm();

  ngOnInit(): void {
  }

  public onRecoveryClick(): void {
    this.resetMessage();
    console.log(this.form.value)
    if (this.form.valid) {
      this.authRestService.recover(this.form.value).subscribe({
        error: (error:HttpErrorResponse): void => {this.messageError(error.error)},
        next: (response: boolean): void => {
          if (response) this.messageSuccess("Check your email and follow the link from the letter. If the email has not arrived within 15 minutes, check your spam folder!")
          if (!response) this.messageError("Email not sent")
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['',  [Validators.required, Validators.email]],
    });
  }

  private resetMessage(): void {
    this.error = false;
    this.success = false;
  }

  private messageError(message : string) :void {
    this.message = message;
    this.error = true;
  }

  private messageSuccess(message : string) :void {
    this.message = message;
    this.success = true;
  }
}
