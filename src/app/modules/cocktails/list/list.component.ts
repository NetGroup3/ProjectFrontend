import {Component, NgModule, OnInit} from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {ModeratorService} from "../../core/services/moderator.service";
import {Ingredient} from "../../core/models/ingredient";
import {AddEditDishComponent} from "../add-edit-dish/add-edit-dish.component";
import {InitDishService} from "../../core/services/init-dish.service";
import {Dish} from "../../core/models/dish";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/services/client/auth.service";
import {compass} from "@cloudinary/url-gen/qualifiers/gravity";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {
  id = Number(this.route.snapshot.paramMap.get('id'))
  list: TransferItem[] = []
  changes: any [] = []
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[]
  disabled = false
  showSearch = false
  ingredients: Ingredient [] = []
  ingredientsDish: Ingredient [] = []
  dishIngredients: number[] = []

  constructor(private moderatorService: ModeratorService,
              private initDishService: InitDishService,
              private route: ActivatedRoute,
              private authService: AuthService,) {
  }


  ngOnInit(): void {
    if(!isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      this.getIngredients((all) => {
        this.getDish((res: any) => {
          this.initList(all, res.ingredients)
        })

      })
    }
    else {
      this.getIngredients((all) => {
        this.initList(all, [])
      })
    }
  }

  initList(array: Ingredient[], right: Ingredient []){
   array.forEach(el =>{
     this.initDishService.ingredients.push(el.id)
   })
    this.list = []
    for (let i = 0; i < array.length; i++) {
      this.list.push({
        key: array[i].id.toString(),
        title: array[i].title,
        measurement: array[i].measurement,
        amount: '',
        checked: false
      });
    }
    for (let i = 0; i < right.length; i++) {
      this.list.forEach(el => {
        if(el.key == right[i].id){
          el.direction = 'right'
        }
      })
    }
    this.initDishService.listIngredients = this.list
  }

  getIngredients(callback: (res: Ingredient[]) => void): void {
    this.moderatorService.getIngredients(50, 0, "", "", "")
      .subscribe((res) => callback(res));
  }

  getDish(callback: (res: any) => void): void {

    this.moderatorService.getDish(this.id, +this.authService.getUserId())
      .subscribe((res: any) => callback(res));
  }


  change(ret: TransferChange): void {
    ret.list.forEach(el => {
      this.initDishService.changedIngredients.push(el)
    })
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
    this.initDishService.listIngredients = this.list
  }
}
