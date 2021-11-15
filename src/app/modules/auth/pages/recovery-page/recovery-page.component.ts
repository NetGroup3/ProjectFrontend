import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthRestService} from "../../services/rest/auth-rest.service";

@Component({
  selector: 'app-recovery-page',
  templateUrl: './recovery-page.component.html',
  styleUrls: ['./recovery-page.component.scss']
})
export class RecoveryPageComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authRestService: AuthRestService
  ) {
  }

  public form: FormGroup = this.buildForm();

  ngOnInit(): void {
  }

  public onRecoveryClick(): void {
    console.log(this.form.value.email)
    if (this.form.valid) {
      this.authRestService.recover(this.form.value.email).subscribe((response: any) => {
        console.log(response)
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.email],
    });
  }
}
