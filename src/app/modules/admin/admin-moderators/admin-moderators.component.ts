import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appLinks} from "../../../app.links";
import {ModerListItem} from "../models/moderListItem";
import {toBoolean} from "ng-zorro-antd/core/util";
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss']
})
export class AdminModeratorsComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private notification: NzNotificationService) {}

  moderatorList: ModerListItem[] = [];
  pageNo: number = 1;
  pagesTotal: number = 1;

  formValue = {
    searchFirstname: "",
    searchLastname: "",
    searchEmail: "",
    sortProps: [],
    pageNo: 1,
    perPage: 10
  };

  showInjected: boolean = false;
  showConfirm: boolean = true;
  emptyList: boolean = false;
  isLoading: boolean = true;
  buttonDisabled: boolean = false;
  idToDelete: number = -1;

  buttonB: boolean = false;
  buttonF: boolean = false;

  inputData: ModerListItem | undefined;

  settingsForm = new FormGroup({
    search: new FormControl(''),
    searchInput: new FormControl(''),
    sort: new FormControl(''),
    sortType: new FormControl('')
  });

  ngOnInit(): void {
    this.onSubmit();
  }

  changeElementsState() {
    this.showConfirm = !this.showConfirm;
    this.buttonDisabled = !this.buttonDisabled;
  }

  clearFormValue() {
    this.formValue.searchFirstname = "";
    this.formValue.searchLastname = "";
    this.formValue.searchEmail = "";
    this.formValue.sortProps = [];
    this.formValue.pageNo = 1;
    this.formValue.perPage = 10;
  }

  setUpFormValue() {
    const formData = this.settingsForm.value;
    this.clearFormValue();

    if (formData.searchInput !== null) {
      if (formData.search === "firstname") {
        this.formValue.searchFirstname = formData.searchInput;
      }
      else if (formData.search === "lastname") {
        this.formValue.searchLastname = formData.searchInput;
      }
      else if (formData.search === "email") {
        this.formValue.searchEmail = formData.searchInput;
      }
    }

    if (formData.sort === "") {
      formData.sort = "timestamp";
    }
    if (formData.sortType === "") {
      formData.sortType = "false";
    }

    // @ts-ignore
    this.formValue.sortProps.push({column: formData.sort, asc: toBoolean(formData.sortType)});
  }

  onSubmit() {
    this.setUpFormValue();
    this.loadList();
  }

  onForward() {
    this.formValue.pageNo ++;
    this.loadList();
  }

  onBackward() {
    this.formValue.pageNo --;
    this.loadList();
  }

  setShowInjected(value: boolean) {
    this.buttonDisabled = value;
    this.showInjected = value;
    if (value) {
      this.settingsForm.controls['searchInput'].disable();
      this.settingsForm.controls['search'].disable();
      this.settingsForm.controls['sortType'].disable();
      this.settingsForm.controls['sort'].disable();
    }
    else {
      this.settingsForm.controls['searchInput'].enable();
      this.settingsForm.controls['search'].enable();
      this.settingsForm.controls['sortType'].enable();
      this.settingsForm.controls['sort'].enable();
    }
  }

  onAddEditClicked(moder: ModerListItem | undefined) {
    this.inputData = moder;
    this.setShowInjected(true);
  }

  onDeleteConfirm(id: number) {
    this.idToDelete = id;
    this.changeElementsState();
  }

  deleteModer() {
    this.changeElementsState();
    this.http.delete(appLinks.moderator + "/" + this.idToDelete)
      .subscribe(() => {
        this.loadList();
        this.notify("Deleted successfully.");
    },
    () => {
        this.notify("Oh snap. That didn't work. Please try again later.");
    });
  }

  setNavButtons() {
    if (this.moderatorList === null) {
      this.buttonB = false;
      this.buttonF = false;
    }
    else {
      if (this.pageNo === 1) {
        this.buttonB = false;
      } else {
        this.buttonB = true;
      }
      if (this.pageNo === this.pagesTotal) {
        this.buttonF = false;
      } else {
        this.buttonF = true;
      }
    }
  }

  loadList () {
    this.isLoading = true;
    this.emptyList = false;
    this.http.post<ModerListItem[]>(appLinks.moderatorList, this.formValue).subscribe(
    (res) => {
      this.isLoading = false;
      this.moderatorList = res;
      this.pageNo = this.formValue.pageNo;
      if (res === null || res.length === 0) {
        this.emptyList = true;
      }
      else {
        this.pagesTotal = this.moderatorList[0].pagesTotal;
        for (const moder of this.moderatorList) {
          moder.timestamp = (new Date(moder.timestamp.toString())).toLocaleString();
        }
        this.emptyList = false;
      }
      this.setNavButtons();
    },
    () => {
      this.emptyList = true;
      this.notify("Oh snap. We are having troubles here. Please try again later.");
    });
  }

  notify(text: string) {
    this.notification
      .blank(
        'Notification',
        text
      )
  }
}
