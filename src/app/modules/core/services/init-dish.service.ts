import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InitDishService {
  public changedIngredients: any [] = []
  public changedKitchenware: any [] = []
  public changedLabel: any [] = []
  constructor() { }
}
