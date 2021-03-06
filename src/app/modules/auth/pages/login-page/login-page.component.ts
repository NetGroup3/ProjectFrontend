import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRestService} from "../../services/rest/auth-rest.service";
import {AuthService} from "../../services/client/auth.service";
import { ActivatedRoute } from '@angular/router';
import {UserLoginModel} from "../../models/user-login.model";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private verify: string = "";
  private recovery: string = "";
  public error: boolean = false;
  public success: boolean = false;
  public message: string = "";

  public form: FormGroup = this.buildForm();

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.verify = params['verify'];
      this.recovery = params['recovery'];
      if ( this.verify != null) this.verifyCode();
      if ( this.recovery != null) this.recoveryCode();
    });
  }

  public onLoginClick(): void {
    this.resetMessage();
    if (this.form.valid){
      this.authRestService.login(this.form.value).subscribe({
        error: (): void => {this.messageError("User not found or password incorrect!")},
        next: (user:UserLoginModel): void => {
          this.authService.setUser(user);
          this.router.navigate(["/settings"]);
          },
      });
      } else {
        this.form.markAllAsTouched();
        this.messageError("Please check all fields!");
      }
    }

  private buildForm(): FormGroup {
      return this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
      });
    }

  private verifyCode(): void {
      this.authRestService.code(this.verify).subscribe(
        () => {
        this.messageSuccess("Your mail verified! Please login.")
      });
    }

  private recoveryCode(): void {
      this.authRestService.code(this.recovery).subscribe(
        () => {
        this.messageSuccess("A new login password has been sent to you by email")
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
