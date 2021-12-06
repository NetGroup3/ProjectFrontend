import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRestService} from "../../services/rest/auth-rest.service";
import {AuthService} from "../../services/client/auth.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private verify: any;
  private recovery: any;

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService,
    private router: Router,
    private authService: AuthService,
    private activateRoute: ActivatedRoute
  ) {
  }

  public form: FormGroup = this.buildForm();

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.verify = params['verify'];
      this.recovery = params['recovery'];
      if ( this.verify != null) this.verifyCode();
      if ( this.recovery != null) this.recoveryCode();
    });
  }



  public onLoginClick(): void {
    console.log(this.form.value);
    if (this.form.valid){
      this.authRestService.login(this.form.value).subscribe((response:any)=>{
        console.log(response);
        this.authService.setToken(response.token);
        this.authService.setUserData(response.id, response.firstname, response.lastname, response.role, response.imageId);
        this.router.navigate(["/home"]);
      });
    } else {
      this.form.markAllAsTouched();
      alert("Incorrect data!")
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(128)]]
    });
  }

  private verifyCode(): void {
    this.authRestService.code(this.verify).subscribe((response: any) => {
      console.log(response)
    })
  }

  private recoveryCode(): void {
    this.authRestService.code(this.recovery).subscribe((response: any) => {
      console.log(response)
    })
  }

}
