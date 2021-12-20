import { Injectable } from '@angular/core';
import {Ingredient} from "../models/ingredient";
import {Kitchenware} from "../models/kitchenware";
import {TransferChange, TransferItem} from "ng-zorro-antd/transfer";

@Injectable({
  providedIn: 'root'
})
export class InitDishService {

  public listIngredients: TransferItem[] = [];
  public listKitchenware: TransferItem[] = [];
  public listLabels: TransferItem[] = [];

}
