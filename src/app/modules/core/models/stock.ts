import {Ingredient} from "./ingredient";

export interface Stock {
  id: number;
  userId: number;
  amount: number;
  ingredient: Ingredient;
}
