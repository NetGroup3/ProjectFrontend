import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {appLinks} from "../../../app.links";
import {ModeratorModel} from "./moderator.model";
import {PagResModel} from "./pag-res.model";
import {toBoolean} from "ng-zorro-antd/core/util";

@Component({
  selector: 'app-admin-moderators',
  templateUrl: './admin-moderators.component.html',
  styleUrls: ['./admin-moderators.component.scss']
})
export class AdminModeratorsComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  moderatorList!: ModeratorModel[];
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
  emptyList: boolean = true;
  buttonDisabled: boolean = false;
  idToDelete: number = -1;

  buttonB: boolean = false;
  buttonF: boolean = false;

  inputData: ModeratorModel | undefined;

  settingsForm = new FormGroup({
    search: new FormControl(''),
    searchInput: new FormControl(''),
    sort: new FormControl(''),
    sortType: new FormControl('')
  });

  ngOnInit(): void {
    this.loadList({sortProps: [{
      column: "timestamp",
      asc: false
    }]});
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

  onSubmit() {
    const obj = this.settingsForm.value;
    this.clearFormValue();
    if (obj.searchInput !== "") {
      if (obj.search === "firstname") {
        this.formValue.searchFirstname = obj.searchInput;
      }
      else if (obj.search === "lastname") {
        this.formValue.searchLastname = obj.searchInput;
      }
      else if (obj.search === "email") {
        this.formValue.searchEmail = obj.searchInput;
      }
    }
    // @ts-ignore
    this.formValue.sortProps.push({column: obj.sort, asc: toBoolean(obj.sortType)});
    this.loadList(this.formValue);
  }

  onForward() {
    this.formValue.pageNo++;
    this.loadList(this.formValue);
  }

  onBackward() {
    this.formValue.pageNo --;
    this.loadList(this.formValue);
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

  onAddEditClicked(moder: ModeratorModel | undefined) {
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
        this.loadList(this.formValue);
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

  loadList (obj: Object) {
    this.http.post<PagResModel>(appLinks.moderatorList, obj).subscribe(
    (res) => {
      this.moderatorList = res.list;
      this.pageNo = res.pageNo;
      this.pagesTotal = res.pagesTotal;
      if (res.list === null) {
        this.emptyList = true;
      }
      else {
        for (const moder of this.moderatorList) {
          moder.timestamp = (new Date(moder.timestamp.toString())).toLocaleString();
        }
        this.emptyList = false;
      }
      this.setNavButtons();
    },
    (err) => {
      this.emptyList = true;
    });
  }
}
