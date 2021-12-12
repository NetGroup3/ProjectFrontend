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

  moderData: ModeratorModel = {
    id: -1,
    email: '',
    firstname: '',
    lastname: '',
    timestamp: '',
    imageId: "",
    status: ''
  };

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
      let obj = this.moderInfoForm.value;
      if (this.inputModerData !== undefined) {
        this.moderData.firstname = obj.firstname;
        this.moderData.lastname = obj.lastname;
        this.moderData.email = obj.email;

        console.log(this.moderData);

        this.http.put<void>(appLinks.moderator, this.moderData).subscribe(() => {
          this.close();
          this.updateEmit.emit();
        });
      } else {
        this.http.post<void>(appLinks.moderator, obj).subscribe((res:any) => {
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
