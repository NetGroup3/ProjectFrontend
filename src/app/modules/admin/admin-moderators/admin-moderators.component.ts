import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ModerListItem} from "../models/moderListItem";
import {toBoolean} from "ng-zorro-antd/core/util";
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {ModeratorListService} from '../../core/services/moderator-list.service';
import {RequestBody} from '../models/requestBody';
import {AddEditModer} from '../models/addEditModer';

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss']
})

export class AdminModeratorsComponent implements OnInit {

  constructor(
    private notification: NzNotificationService,
    private service: ModeratorListService
  ) {}

  defaultPerPage: number = 10;
  defaultPageNo: number = 1;

  moderatorList: ModerListItem[] = [];
  pageNo: number = 1;
  pagesTotal: number = 1;

  formValue: RequestBody = {
    searchFirstname: "",
    searchLastname: "",
    searchEmail: "",
    sortProps: [],
    pageNo: this.defaultPageNo,
    perPage: this.defaultPerPage
  };

  showInjected: boolean = false;
  showConfirm: boolean = true;
  emptyList: boolean = false;
  isLoading: boolean = true;
  buttonDisabled: boolean = false;
  idToDelete: number = -1;

  buttonB: boolean = false;
  buttonF: boolean = false;

  inputData: AddEditModer | undefined;

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
    this.formValue.pageNo = this.defaultPageNo;
    this.formValue.perPage = this.defaultPerPage;
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
    if (moder === undefined) {
      this.inputData = undefined;
    }
    else {
      this.inputData = {
        id: moder.id,
        email: moder.email,
        firstname: moder.firstname,
        lastname: moder.lastname
      }
    }
    this.setShowInjected(true);
  }

  onDeleteConfirm(id: number) {
    this.idToDelete = id;
    this.changeElementsState();
  }

  deleteModer() {
    this.changeElementsState();
    this.service.deleteModerator(this.idToDelete)
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
    this.service.getPaginatedModerators(this.formValue)
      .subscribe((res) => {
        this.isLoading = false;
        this.moderatorList = res;
        if (res === null || res.length === 0) {
          this.emptyList = true;
        }
        else {
          this.pagesTotal = this.moderatorList[0].pagesTotal;
          for (const moder of this.moderatorList) {
            moder.timestamp = (new Date(moder.timestamp.toString())).toLocaleString();
          }
          this.pageNo = this.formValue.pageNo;
          this.emptyList = false;
          this.setNavButtons();
        }
      },
      () => {
        this.emptyList = true;
        this.notify("Oh snap. We are having troubles here. Please try again later.");
      });
  }

  notify(text: string) {
    this.notification
      .blank(
        "",
        text
      )
  }
}
