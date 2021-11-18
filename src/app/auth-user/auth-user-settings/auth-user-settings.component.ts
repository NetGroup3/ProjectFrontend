import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-user-settings',
  templateUrl: './auth-user-settings.component.html',
  styleUrls: ['./auth-user-settings.component.scss']
})
export class AuthUserSettingsComponent implements OnInit {
  public nameForm: FormGroup = this.buildForm()
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  private buildForm():FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      lastname: ['', [Validators.required]]
    });
  }
}
