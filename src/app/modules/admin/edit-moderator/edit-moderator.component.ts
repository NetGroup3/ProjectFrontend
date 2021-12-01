import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModeratorModel} from "../admin-moderators/moderator.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appLinks} from "../../../app.links";

@Component({
  selector: 'app-add-edit-moderator',
  templateUrl: './edit-moderator.component.html',
  styleUrls: ['./edit-moderator.component.scss']
})
export class EditModeratorComponent implements OnInit {

  moderInfoForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.moderInfoForm = this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      email: ['', Validators.required ]
    });
  }

  moderData: ModeratorModel = {
    id: -1,
    email: 'j.d@gmail.com',
    firstname: 'John',
    lastname: 'Doe',
    timestamp: {},
    imageId: '',
    status: ''
  };

  @Input() inputModerData: ModeratorModel | undefined;
  @Input() type: String = "";

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputModerData'].currentValue !== undefined) {
      this.moderData = changes['inputModerData'].currentValue;
    }
    else {
      this.moderData = {
        id: -1,
        email: 'j.d@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        timestamp: {},
        imageId: '',
        status: ''
      };
    }
  }

  @Output() closeEmit = new EventEmitter<boolean>();
  @Output() updateEmit = new EventEmitter<void>();

  ngOnInit(): void {}

  onSubmit() {
    if (this.moderInfoForm.valid) {
      let obj = this.moderInfoForm.value;
      if (this.type === "Edit") {
        this.moderData.firstname = obj.firstname;
        this.moderData.lastname = obj.lastname;
        this.moderData.email = obj.email;

        this.http.put<void>(appLinks.moderator, this.moderData).subscribe(() => {
          this.close();
          this.updateEmit.emit();
        });
      } else if (this.type === "Add") {
        this.http.post<void>(appLinks.moderator, obj).subscribe(() => {
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
