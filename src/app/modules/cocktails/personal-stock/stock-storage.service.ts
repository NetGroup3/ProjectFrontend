import {Injectable } from '@angular/core';
import {Stock} from "../../core/models/stock";
import {Ingredient} from "../../core/models/ingredient";
import {StockService} from "../../core/services/stock.service";


@Injectable({
  providedIn: 'root'
})
export class StockStorageService {

  private ingredientLimit: number = 10;
  private ingredientPage: number = 0;
  public ingredients: Ingredient[] = [];
  private isLoadingIngredients: boolean = false;

  private stockLimit: number = 10;
  private stockPage: number = 0;
  public stocks: Stock[] = [];

  constructor(
    private stockService: StockService,
                  ) {
  }

  public getIngredients(): void {
    this.stockService.getIngredients(this.ingredientLimit, this.ingredientPage)
      .subscribe((ingredients: Ingredient[]) =>{
        this.ingredients = ingredients;
        this.ingredientPage++;
      });
  }

  public loadMoreIngredients() {
    if (this.isLoadingIngredients){
      return;
    }
    this.isLoadingIngredients = true;
    this.stockService.getIngredients(this.ingredientLimit, this.ingredientPage)
      .subscribe((ingredients: Ingredient[]) => {
        this.isLoadingIngredients = false;
        this.ingredientPage++;
        this.ingredients = [...this.ingredients, ...ingredients];
      });
  }

  deleteIngredient(ingredientId: Ingredient): void {
    this.ingredients = this.ingredients.filter(ingredient => ingredient.id!==ingredientId.id);
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
  }

  public addStock(selectedIngredient: Ingredient, amount: number): string {

    return " ok";
  }
}
