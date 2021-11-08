import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {User} from "../User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {

  form:any
  constructor(
    public router: Router,
    public userService : UserService,
    public fb : FormBuilder,
  ) { }




  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nickname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      firstname: new FormControl(null, []),
      lastname: new FormControl(null, [])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const user: User = {
      nickname: this.form?.get('nickname')?.value,
      password: this.form?.get('password')?.value,
      email: this.form?.get('email')?.value,
      firstname: this.form?.get('firstname')?.value,
      lastname: this.form?.get('lastname')?.value
    }

    console.log({user})

    if (user) {
      this.userService.addUser(user)
        .subscribe(user => {
          console.log(user);
        });
    }
  }

}
