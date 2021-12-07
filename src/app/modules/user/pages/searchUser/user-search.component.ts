import {Component} from '@angular/core';
import {UserSearch} from "../../models/userSearch";
import {UserSearchService} from "../../services/user-search.service";


@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent {
  userSearch: UserSearch[] = [];
  users: string[] = [];
  inputValue?: string;
  filteredOptions: string[] = [];

  constructor(private userService: UserSearchService) {
    this.filteredOptions = this.users;
  }

  getUsers(name: string): void {
    this.userService.getUsers(name)
      .subscribe((response) => {
        // console.log('test', response)
        this.userSearch = response
      });
    this.filteredOptions = this.users.filter(option => option.toLowerCase().indexOf(name.toLowerCase()) !== -1);
  }

}
