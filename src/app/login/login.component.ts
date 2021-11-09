import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form:any
  constructor(
    public router: Router,
    public userService : UserService,
    public fb : FormBuilder
              ) { }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const userData: any = {
      email: this.form?.get('email')?.value,
      password: this.form?.get('password')?.value
    }

    console.log({userData})


/*    this.userService.login(userData).subscribe((resp) => {
      this.router.navigateByUrl(this.returnUrl)
    })*/
  }
}
