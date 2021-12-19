import {Component, OnInit} from '@angular/core';
import {UserSearch} from "../../models/user-search";
import {UserService} from "../../services/user.service";
import {Observable, Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  public userList: UserSearch[] = [];
  public selectedUser?: number;
  public isLoading = false;
  public searchSubject: Subject<string> = new Subject<string>();
  public search$: Observable<string> = this.searchSubject.asObservable();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.search$
      .pipe(debounceTime(300))
      .subscribe((searchTerm: string) => {
        this.getUsers(searchTerm);
      });
  }

  public onSearch(searchTerm: string): void {
    this.isLoading = true;
    this.searchSubject.next(searchTerm);
  }

  public onUserSelected(userId: number): void {
    this.router.navigate([`/user/user-profile/${userId}`]);
  }

  private getUsers(name: string): void {
    this.userService.getUsers(name)
      .subscribe((userList: UserSearch[]) => {
        this.userList = userList;
        this.isLoading = false;
      });
  }

}
