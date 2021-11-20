import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../app.links";


@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  constructor(private http: HttpClient) { }

  public get_ingridient (id: number) : Observable<any>{
    return this.http.get(appLinks.ingridients);
  }
  public get_ingridients () : Observable<any>{
    return this.http.get(appLinks.ingridients);
  }
}
