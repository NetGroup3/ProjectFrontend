import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Dish} from "../models/dish";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  limit: number = 10;
  page: number = 0;
  Dishes: Dish[] = [];

  constructor(private moderatorService: ModeratorService) {
  }
  toggle: boolean = true;
  ngOnInit(): void {
    this.getDish(this.limit, this.page);
  }

  getDish(limit: number, page: number): void {
    this.moderatorService.get_dishes(limit, page)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.Dishes = response.body
      });
  }

  next() {
    if(this.Dishes.length === 0 || this.Dishes.length < 10){
      this.page = 0;
      this.ngOnInit();
    }
    else{
      this.page = this.page + 1;
      this.ngOnInit();
    }
  }

  prev() {
    if(this.page > 0) {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  cancel() {
    this.toggle = !this.toggle;
  }

  ok(id: number) {
    this.toggle = !this.toggle;
    this.moderatorService.delete_dish(id).subscribe((response:any)=>{
      console.log(response)
    });
  }


}
