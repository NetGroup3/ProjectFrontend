import { Component, OnInit } from '@angular/core';
import {Dish} from "../../../core/models/dish";
import {StockService} from "../../../core/services/stock.service";

@Component({
  selector: 'app-recommend-dish',
  templateUrl: './recommend-dish.component.html',
  styleUrls: ['./recommend-dish.component.scss']
})
export class RecommendDishComponent implements OnInit {

  dishes: Dish [] = [];

  constructor(
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    this.getRecommendDishes()
  }

  getRecommendDishes() {
    this.stockService.getRecommendDishes(5,0).subscribe(( dishes: Dish [])=>{
      this.dishes=dishes;
    });
  }

}
