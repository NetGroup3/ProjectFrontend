import {Component, OnInit} from '@angular/core';
import {StockService} from "../../../core/services/stock.service";
import {DishFormat} from "../../../core/models/dishFormat";

@Component({
  selector: 'app-recommend-dish',
  templateUrl: './recommend-dish.component.html',
  styleUrls: ['./recommend-dish.component.scss']
})
export class RecommendDishComponent implements OnInit {

  dishes: DishFormat [] = [];

  constructor(
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    this.getRecommendDishes()
  }

  getRecommendDishes() {
    this.stockService.getRecommendDishes(5,0).subscribe(( dishes: DishFormat [])=>{
      this.dishes=dishes;
    });
  }

}
