import {Component, OnInit} from '@angular/core';
import {StockService} from "../../../core/services/stock.service";
import {DishFormat} from "../../../core/models/dishFormat";

@Component({
  selector: 'app-recommend-dish',
  templateUrl: './recommend-dish.component.html',
  styleUrls: ['./recommend-dish.component.scss']
})
export class RecommendDishComponent implements OnInit {

  public dishes: DishFormat [] = [];
  public limit: number = 5;
  public page: number = 0;
  public pages: number = 0;
  public isLoading: boolean = false;
  constructor(
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    this.getRecommendDishes()
  }

  getRecommendDishes() {
    this.isLoading = true;
    this.stockService.getRecommendDishes(this.limit,this.page).subscribe(( dishes: DishFormat [])=>{
      this.dishes = dishes;
      this.isLoading = false;
    });
  }

  prev() {
    if(!this.isLoading && this.page > 0) {
      this.page--;
      this.getRecommendDishes();
    }
  }

  next() {
    if(!this.isLoading && this.page < this.pages)
    this.page++;
    this.getRecommendDishes();
  }
}
