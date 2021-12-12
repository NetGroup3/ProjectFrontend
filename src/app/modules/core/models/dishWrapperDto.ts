import {Dish} from "./dish";
import {DishIngredientDto} from "./dishIngredientDto";
import {DishKitchenwareDto} from "./DishKitchenwareDto";
import {DishLabelDto} from "./DishLabelDto";

export interface DishWrapperDto{
  dish: Dish,
  ingredients: DishIngredientDto [],
  kitchenware: DishKitchenwareDto [],
  label: DishLabelDto [],
}
