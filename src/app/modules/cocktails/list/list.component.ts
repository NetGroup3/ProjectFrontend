import {Component, NgModule, OnInit} from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {ModeratorService} from "../../core/services/moderator.service";
import {Ingredient} from "../../core/models/ingredient";
import {AddEditDishComponent} from "../add-edit-dish/add-edit-dish.component";
import {InitDishService} from "../../core/services/init-dish.service";
import {Dish} from "../../core/models/dish";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/services/client/auth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {
  list: TransferItem[] = []
  changes: any [] = []
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  disabled = false;
  showSearch = false;
  ingredients: Ingredient [] = [];
  limit: number = 10;
  page: number = 0;
  ingredientsDish: Ingredient [] = []

  constructor(private moderatorService: ModeratorService,
              public initDishService: InitDishService,
              private route: ActivatedRoute,
              private authService: AuthService,) {
  }

  dishIngredients: number[] = []
  ngOnInit(): void {

    this.getIngredients((all: any) => {
      this.getDish((res: any) =>
      {
        this.initList(all, res.ingredients)
      })

    })

  }

  initList(array: any[], right: any []){
   array.forEach(el =>{
     this.initDishService.ingredients.push(el.id)
   })
    this.list = []
    for (let i = 0; i < array.length; i++) {
      this.list.push({
        key: array[i].id.toString(),
        title: array[i].title,
        description: `description of content${i + 1}`,
        checked: false
      });
    }
  right.forEach(i => this.list[i.id].direction = 'right')
  }

  getIngredients(callback: (res: any) => void): void {
    this.moderatorService.get_ingridients(this.limit, this.page, "", "", "")
      .subscribe((res: any) => callback(res));
  }

  getDish(callback: (res: any) => void): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id, +this.authService.getUserId())
      .subscribe((res: any) => callback(res));
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }


  change(ret: TransferChange): void {
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.list =  this.list.map(e => {
      if (listKeys.includes(e.key) && hasOwnKey(e)) {
        if (ret.to === 'left') {
          delete e.hide;
        } else if (ret.to === 'right') {
          e.hide = false;
        }
      }
      return e;
    });
  }
}
