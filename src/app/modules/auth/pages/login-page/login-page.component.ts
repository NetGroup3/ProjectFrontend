import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestapiService} from "../../services/rest/restapi.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRestService: RestapiService,
    private router:Router
  ) { }

  public form: FormGroup = this.buildForm();

  ngOnInit(): void {
  }

  public onLoginClick(): void {
    console.log(this.form.value.password)
    if (this.form.valid){
      this.authRestService.login(this.form.value.email,this.form.value.password).subscribe((response:any)=>{
        console.log(response)
        this.router.navigate(["/home"])
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
