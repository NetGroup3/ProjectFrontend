import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../app.links";
import {Ingredient} from "../models/ingredient";
import {Kitchenware} from "../models/kitchenware";
import {Dish} from "../models/dish";

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {


  constructor(private http: HttpClient) {

  }

   public get_ingridient(id: number): Observable<Object>{
    return this.http.get(appLinks.ingredient, {
      params: new HttpParams().set('id', id)
    });
  }

  public get_ingridients (limit: number, page: number) : Observable<any>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    return this.http.get(appLinks.ingredients, {params});
  }

  public add_ingredient (body: Ingredient){
    console.log( body)
    return this.http.post(appLinks.ingredient, body);
  }

   public edit_ingredient(body: Ingredient){
     console.log( this.http.put(appLinks.ingredient, body))
     return this.http.put(appLinks.ingredient, body);
   }

  public delete_ingredient(id: number){
    console.log( this.http.delete(appLinks.ingredient, {
      params: new HttpParams().set('id', id)
    }))
    return this.http.delete(appLinks.ingredient, {
      params: new HttpParams().set('id', id)
    });
  }

  get_Kitchenware(limit: number, page: number) : Observable<any>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    return this.http.get(appLinks.Kitchenware, {params});
  }

  public get_kitchenware(id: number): Observable<Object>{
    return this.http.get(appLinks.kitchenware+'/'+id)
  }

  public add_kitchenware (body: Kitchenware){
    console.log( this.http.post(appLinks.kitchenware, body))
    return this.http.post(appLinks.kitchenware, body);
  }

  public edit_kitchenware(body: Kitchenware){
    console.log( this.http.put(appLinks.kitchenware, body))
    return this.http.put(appLinks.kitchenware, body);
  }

  public delete_kitchenware(id: number){
    console.log( this.http.delete(appLinks.kitchenware, {
      params: new HttpParams().set('id', id)
    }))
    return this.http.delete(appLinks.kitchenware, {
      params: new HttpParams().set('id', id)
    });
  }
  public get_dish(id: number): Observable<Object>{
    return this.http.get(appLinks.dish+'/'+id)
  }

  public add_dish (body: Dish){
    console.log( this.http.post(appLinks.dish, body))
    return this.http.post(appLinks.dish, body);
  }

  public edit_dish(body: Dish){
    console.log( this.http.put(appLinks.dish, body))
    return this.http.put(appLinks.dish, body);
  }
  public get_dishes(limit: number, page: number) {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    return this.http.get(appLinks.dishes, {params});
  }

  public delete_dish(id: number) {
    return this.http.delete(appLinks.dish, {
      params: new HttpParams().set('id', id)
    });
  }
}
