import {Dish} from "./dish";
import {DishIngredientDto} from "./dishIngredientDto";

export interface DishWrapperDto{
  dish: Dish,
  ingredients: DishIngredientDto [],
  kitchenware: number [],
  lable: number [],
}
