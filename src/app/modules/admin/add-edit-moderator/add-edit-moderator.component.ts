import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {appLinks} from "../../../app.links";
import {AddEditModer} from '../models/addEditModer';
import {ModeratorListService} from '../../core/services/moderator-list.service';

@Component({
  selector: 'app-add-edit-moderator',
  templateUrl: './add-edit-moderator.component.html',
  styleUrls: ['./add-edit-moderator.component.scss']
})
export class AddEditModeratorComponent {

  buttonDisabled: boolean = false;
  moderInfoForm: FormGroup;
  isLoading: boolean = false;

  moderData!: AddEditModer;

  @Input() public inputModerData: AddEditModer | undefined;

  @Output() closeEmit = new EventEmitter<void>();
  @Output() updateEmit = new EventEmitter<void>();
  @Output() notifyEmit = new EventEmitter<string>();

  constructor(private http: HttpClient, private fb: FormBuilder, private service: ModeratorListService) {
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
        lastname: 'Doe'
      };
    }
  }

  onSubmit() {
    if (this.moderInfoForm.valid) {
      this.buttonDisabled = true;
      this.isLoading = true;
      const formData = this.moderInfoForm.value;
      this.moderData.firstname = formData.firstname;
      this.moderData.lastname = formData.lastname;
      this.moderData.email = formData.email;

      if (this.inputModerData !== undefined) {
        this.service.updateModerator(this.moderData)
          .subscribe(() => {
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
        this.service.createModerator(this.moderData)
          .subscribe(() => {
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
