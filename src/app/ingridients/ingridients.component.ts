import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import {IngridientPage} from "../modules/auth/models/ingridient-page";

@Component({
  selector: 'app-ingridients',
  templateUrl: './ingridients.component.html',
  styleUrls: ['./ingridients.component.scss']
})
export class IngridientsComponent implements OnInit {
  limit: number = 10;
  page: number = 0;
  Ingridients: Ingredient[] = [];

  constructor(private moderatorService: ModeratorService) {
  }
  toggle: boolean = true;
  ngOnInit(): void {
    this.getIngridients(this.limit, this.page);
  }

  getIngridients(limit: number, page: number): void {
    this.moderatorService.get_ingridients(limit, page)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.Ingridients = response.body
      });
  }

  next() {
    this.page = this.page + 1;
    this.ngOnInit();
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
    this.moderatorService.delete_ingredient(id).subscribe((response:any)=>{
      console.log(response)
    });
  }
}
