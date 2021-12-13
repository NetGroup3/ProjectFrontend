import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModeratorModel} from "../admin-moderators/moderator.model";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../app.links";

@Component({
  selector: 'app-add-edit-moderator',
  templateUrl: './add-edit-moderator.component.html',
  styleUrls: ['./add-edit-moderator.component.scss']
})
export class AddEditModeratorComponent {

  buttonDisabled = false;
  moderInfoForm: FormGroup;

  moderData!: ModeratorModel;

  @Input() public inputModerData: ModeratorModel | undefined;

  @Output() closeEmit = new EventEmitter<boolean>();
  @Output() updateEmit = new EventEmitter<void>();

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.moderInfoForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.required ]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputModerData'].currentValue !== undefined) {
      this.moderData = Object.assign({}, changes['inputModerData'].currentValue);
      //this.moderData.timestamp = {};
    }
    else {
      this.moderData = {
        id: -1,
        email: 'j.d@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        timestamp: "",
        imageId: '',
        status: ''
      };
    }
  }

  onSubmit() {
    if (this.moderInfoForm.valid) {
      this.buttonDisabled = true;
      let formData = this.moderInfoForm.value;
      if (this.inputModerData !== undefined) {
        this.moderData.firstname = formData.firstname;
        this.moderData.lastname = formData.lastname;
        this.moderData.email = formData.email;

        console.log(this.moderData);
        let moderInfo = Object.assign({}, this.moderData);
        // @ts-ignore
        delete moderInfo.timestamp;
        console.log(moderInfo);

        this.http.put<void>(appLinks.moderator, moderInfo).subscribe(() => {
          this.close();
          this.updateEmit.emit();
        });
      } else {
        this.http.post<void>(appLinks.moderator, formData).subscribe((res:any) => {
          this.close();
          this.updateEmit.emit();
        });
      }
    }
    else {
      this.moderInfoForm.markAllAsTouched();
    }
  }

  close() {
    this.closeEmit.emit(false);
  }

}
