import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthRestService} from "../../services/rest/auth-rest.service";
import {AuthService} from "../../services/client/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  public form: FormGroup = this.buildForm();

  ngOnInit(): void {
  }

  public onLoginClick(): void {
    console.log(this.form.value);
    if (this.form.valid){
      this.authRestService.login(this.form.value).subscribe((response:any)=>{
        console.log(response);
        this.authService.setToken(response.token);
        this.authService.setUserData(response.id, response.firstname, response.lastname, response.role);
        this.router.navigate(["/home"]);
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]]
    });
  }

}
