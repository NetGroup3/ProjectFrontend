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
  public pages: number = 2;
  constructor(
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    this.getRecommendDishes()
  }

  getRecommendDishes() {
    this.stockService.getRecommendDishes(this.limit,this.page).subscribe(( dishes: DishFormat [])=>{
      this.dishes=dishes;
    });
  }

}
