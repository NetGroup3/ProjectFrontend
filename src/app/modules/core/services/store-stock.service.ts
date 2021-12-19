import { Injectable } from '@angular/core';
import {Stock} from "../models/stock";
import {Ingredient} from "../models/ingredient";

@Injectable({
  providedIn: 'root'
})
export class StoreStockService {

  public stocks: Stock[] = [];
  public ingredients: Ingredient[] = [];

}
