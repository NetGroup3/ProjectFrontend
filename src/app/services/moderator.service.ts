import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../app.links";
import {IngridientPage} from "../modules/auth/models/ingridient-page";
import {LoginForm} from "../modules/auth/models/login-form.model";
import {Ingredient} from "../models/ingredient";


@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  constructor(private http: HttpClient) { }
   public get_ingridient(id: number): Observable<Object>{
    return this.http.get(appLinks.ingridient, {
      params: new HttpParams().set('id', id)
    });
  }
  public get_ingridients (limit: number, offset: number) {
    return this.http.get(appLinks.ingridients, {
      params: new HttpParams().set('limit', limit).set('offset', offset)
    });
  }

}
