import {Ingredient} from "../../models/ingredient";

export interface StockModel {
  id: number;
  userId: number;
  amount: number;
  ingredient: Ingredient;
}
