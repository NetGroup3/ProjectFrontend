import {Dish} from "./dish";
import {Ingredient} from "./ingredient";
import {Kitchenware} from "./kitchenware";
import {Label} from "./label";

export interface DishAll{
  dish: Dish,
  ingredients: Ingredient[],
  kitchenware: Kitchenware[],
  labels: Label[]
}
