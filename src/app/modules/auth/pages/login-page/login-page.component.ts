import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthRestService} from "../../services/rest/auth-rest.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService
  ) { }

  public form: FormGroup = this.buildForm();

  ngOnInit(): void {
  }

  public onLoginClick(): void {
    if (this.form.valid){
      this.authRestService.login(this.form.value).subscribe((response:any)=>{
        console.log(response)
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

}
