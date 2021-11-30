import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appLinks} from "../../app.links";
import {ModeratorModel} from "./moderator.model";

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss']
})
export class AdminModeratorsComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  toggle: boolean = true;

  change() {
    this.toggle = !this.toggle;
    this.buttonDisabled = !this.buttonDisabled;
  }

  moderatorList: ModeratorModel[] = [];

  formValue = {
    searchFirstname: "",
    searchLastname: "",
    searchEmail: "",
    pageNo: 1
  };

  showInjected: boolean = false;
  emptyList: boolean = true;
  buttonDisabled: boolean = false;
  idToDelete: number = -1;

  buttonB: boolean = false;
  buttonF: boolean = true;

  inputData: ModeratorModel | undefined;
  type: string = "";


  settingsForm = new FormGroup({
    searchFirstname: new FormControl(''),
    searchLastname: new FormControl(''),
    searchEmail: new FormControl('')
  });

  ngOnInit(): void {
    this.loadList({});
  }

  onSubmit() {
    this.buttonF = true;
    this.buttonB = false;
    let obj = this.settingsForm.value;
    obj.pageNo = 1;
    this.formValue = obj;
    this.loadList(this.formValue);
  }

  onForward() {
    if (this.emptyList) {
      this.buttonF = false;
    }
    else {
      this.formValue.pageNo++;
      this.loadList(this.formValue);
    }
    this.buttonB = true;
  }

  onBackward() {
    if (this.formValue.pageNo != 1) {
      this.buttonF = true;
      this.formValue.pageNo --;
      this.loadList(this.formValue);
      if (this.formValue.pageNo === 1) {
        this.buttonB = false;
      }
    }
    else {
      this.buttonB = false;
    }
  }

  setShowInjected(value: boolean) {
    this.buttonDisabled = value;
    this.showInjected = value;
    if (value) {
      this.settingsForm.controls['searchFirstname'].disable();
      this.settingsForm.controls['searchLastname'].disable();
      this.settingsForm.controls['searchEmail'].disable();
    }
    else {
      this.settingsForm.controls['searchFirstname'].enable();
      this.settingsForm.controls['searchLastname'].enable();
      this.settingsForm.controls['searchEmail'].enable();
    }
  }

  onAddEditClicked(moder: ModeratorModel | undefined) {
    this.inputData = moder;
    if (moder === undefined) {
      this.type = "Add";
    }
    else {
      this.type = "Edit";
    }
    this.setShowInjected(true);
  }

  onDeleteConfirm(id: number) {
    this.idToDelete = id;
    this.change();
  }

  deleteModer() {
    this.change();
    this.http.delete(appLinks.moderator + "/" + this.idToDelete)
      .subscribe(() => {
        this.loadList(this.formValue);
    });
  }

  loadList (obj: Object) {
    this.http.post<ModeratorModel[]>(appLinks.moderatorList, obj).subscribe(
    (res) => {
      this.moderatorList = res;
      this.emptyList = false;
    },
    (err) => {
      this.emptyList = true;
    });
  }
}
