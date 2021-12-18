import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {appLinks} from "../../../app.links";
import {Ingredient} from "../models/ingredient";
import {Kitchenware} from "../models/kitchenware";
import {Dish} from "../models/dish";
import {Dish_ingredients} from "../models/dish_ingredients";
import {Dish_kitchenware} from "../models/dish_kitchenware";
import {DishWrapperDto} from "../models/dishWrapperDto";
import {DishAll} from "../models/dishAll";
import {Label} from "../models/label";
import {DishFavourite} from "../models/dishFavourite";
import {DishFormat} from "../models/dishFormat";

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {


  constructor(private http: HttpClient) {

  }

  public getLabels(limit: number, page: number) : Observable<Label[]>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());
    return this.http.get<Label[]>(appLinks.labels, {params})
  }

   public getIngredient(id: number): Observable<Ingredient>{
    return this.http.get<Ingredient>(appLinks.ingredient, {
      params: new HttpParams().set('id', id)
    });
  }

  public getIngredients (limit: number, page: number, key: string, category: string, sortedBy: string) : Observable<Ingredient[]>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('key', key)
      .set('category', category)
      .set('sortedBy', sortedBy);
    return this.http.get<Ingredient[]>(appLinks.ingredients, {params})
  }

  public addIngredient (body: Ingredient){
    return this.http.post(appLinks.ingredient, body);
  }

   public editIngredient(body: Ingredient){
     return this.http.put(appLinks.ingredient, body);
   }

  public deleteIngredient(id: number){
    return this.http.delete(appLinks.ingredient, {
      params: new HttpParams().set('id', id)
    });
  }

  getKitchenware(limit: number, page: number, key: string, category: string, sortedBy: string) : Observable<Kitchenware[]>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('key', key)
      .set('category', category)
      .set('sortedBy', sortedBy);
    return this.http.get<Kitchenware[]>(appLinks.Kitchenware, {params});
  }

  public getKitchenwareById(id: number): Observable<Kitchenware>{
    return this.http.get<Kitchenware>(appLinks.kitchenware+'/'+id)
  }

  public addKitchenware (body: Kitchenware){
    return this.http.post(appLinks.kitchenware, body);
  }

  public editKitchenware(body: Kitchenware){
    return this.http.put(appLinks.kitchenware, body);
  }

  public deleteKitchenware(id: number){
    return this.http.delete(appLinks.kitchenware, {
      params: new HttpParams().set('id', id)
    });
  }
  public getDish(id: number, userId: number): Observable<DishAll>{
    return this.http.get<DishAll>(appLinks.dish, { params: new HttpParams().set('id', id).set('userId', userId)})
  }

  public addDish (dishWrapperDto: DishWrapperDto): Observable<String>{
    return this.http.post<String>(appLinks.addDish, dishWrapperDto);
  }

  public editDish(dishWrapperDto: DishWrapperDto): Observable<String>{
    return this.http.put<String>(appLinks.addDish, dishWrapperDto);
  }

  public getDishes(limit: number, page: number, desc: boolean, key: string, category: string) : Observable<DishFormat[]>{
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('desc', desc)
      .set('title', key)
      .set('category', category);
    return this.http.get<DishFormat[]>(appLinks.dishes, {params});
  }

  public deleteDish(id: number) {
    return this.http.delete(appLinks.delete, {
      params: new HttpParams().set('id', id)
    });
  }


  public like(dish: number){
    return this.http.post(appLinks.dishLike, dish);
  }

  public searchByIngredients (values: number[], limit: number, page: number): Observable<DishFormat[]>{
    const params = new HttpParams()
      .set('values', values.toString())
      .set('limit', limit.toString())
      .set('page', page.toString());
    return this.http.get<DishFormat[]>(appLinks.searchByIngredients, {params});
  }

  public getFavourite() {
    return this.http.get(appLinks.favourite);
  }

  public addFavourite(body : DishFavourite) {
    return this.http.post(appLinks.favourite, body)
  }

  public removeFavourite(dish : number) {
    return this.http.delete(appLinks.favourite, {
      params: new HttpParams().set('dish', dish).set('userId', 23)
    })
  }

}
