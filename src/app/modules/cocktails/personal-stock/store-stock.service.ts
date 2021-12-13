import { Injectable } from '@angular/core';
import {Stock} from "../../core/models/stock";
import {Ingredient} from "../../core/models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class StoreStockService {

  public stocks: Stock[] = [];
  public ingredients: Ingredient[] = [];

}
