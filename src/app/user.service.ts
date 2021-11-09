import { Injectable } from '@angular/core';

import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {User} from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

/*  private userUrl = 'https://spring-boot-group3.herokuapp.com/users'*/
  private userUrl = 'http://localhost:8081/users'

  constructor(
    private http: HttpClient,
    ) { }

  private log(message: string) {
/*    this.messageService.add('userService: ${message}');*/
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  search(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    return this.http.get<User[]>(`${this.userUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found users matching "${term}"`) :
        this.log(`no users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** POST: add a new user to the server */
  addUser(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`sign up success`)),
      catchError(this.handleError<any>('addUser'))
    );
  }

}
