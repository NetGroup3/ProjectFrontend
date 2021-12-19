import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModerListItem} from "../models/moderListItem";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../app.links";

@Component({
  selector: 'app-add-edit-moderator',
  templateUrl: './add-edit-moderator.component.html',
  styleUrls: ['./add-edit-moderator.component.scss']
})
export class AddEditModeratorComponent {

  buttonDisabled: boolean = false;
  moderInfoForm: FormGroup;
  isLoading: boolean = false;

  moderData!: ModerListItem;

  @Input() public inputModerData: ModerListItem | undefined;

  @Output() closeEmit = new EventEmitter<void>();
  @Output() updateEmit = new EventEmitter<void>();
  @Output() notifyEmit = new EventEmitter<string>();

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
    }
    else {
      this.moderData = {
        id: -1,
        email: 'j.d@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        timestamp: "",
        imageId: '',
        status: '',
        pagesTotal: 0
      };
    }
  }

  onSubmit() {
    if (this.moderInfoForm.valid) {
      this.buttonDisabled = true;
      this.isLoading = true;
      const formData = this.moderInfoForm.value;

      if (this.inputModerData !== undefined) {
        this.moderData.firstname = formData.firstname;
        this.moderData.lastname = formData.lastname;
        this.moderData.email = formData.email;

        const moderInfo = Object.assign({}, this.moderData);
        // @ts-ignore
        delete moderInfo.timestamp;
        // @ts-ignore
        delete moderInfo.pagesTotal;

        this.http.put<void>(appLinks.moderator, moderInfo).subscribe(() => {
          this.closeEmit.emit();
          this.notifyEmit.emit("Updated successfully");
          this.updateEmit.emit();
        },
        () => {
          this.closeEmit.emit();
          this.notifyEmit.emit("Oh snap. This email is already registered. Try another one.");
        });
      }
      else {
        this.http.post<void>(appLinks.moderator, formData).subscribe(() => {
          this.closeEmit.emit();
          this.notifyEmit.emit("Added successfully");
          this.updateEmit.emit();
        },
        () => {
          this.closeEmit.emit();
          this.notifyEmit.emit("Oh snap. This email is already registered. Try another one.");
        });
      }
    }
    else {
      this.moderInfoForm.markAllAsTouched();
    }
  }

  close() {
    this.closeEmit.emit();
  }
}
