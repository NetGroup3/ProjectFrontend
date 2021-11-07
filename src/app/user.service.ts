import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {MessageService} from "./message.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8081/'

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {

  }

  private log (message: string) {
    this.messageService.add('userService: ${message}');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUser(user User): Observable<User> {

    return this.http.post<User>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: User )=> this.log('addUser w/ id=${newHero.id}')),
      catchError(this.handleError<User>('addUser'))
    );
  }

}
