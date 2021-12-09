import { Component, OnInit } from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {Ingredient} from "../../core/models/ingredient";
import {ModeratorService} from "../../core/services/moderator.service";
import {Kitchenware} from "../../core/models/kitchenware";
import {InitDishService} from "../../core/services/init-dish.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/services/client/auth.service";

@Component({
  selector: 'app-list-kitchenware',
  templateUrl: './list-kitchenware.component.html',
  styleUrls: ['./list-kitchenware.component.scss']
})
export class ListKitchenwareComponent implements OnInit {


  changes: any [] = []
  list: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  disabled = false;
  showSearch = false;
  kitchenware: Kitchenware [] = [];
  limit: number = 10;
  page: number = 0;

  constructor(private moderatorService: ModeratorService,
              private initDishService: InitDishService,
              private route: ActivatedRoute,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    if(!isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      this.getKitchenware((all: any) => {
        this.getDish((res: any) => {
          this.initList(all, res.kitchenware)
        })
      })
    }
    else {
      this.getKitchenware((all: any) => {
        this.initList(all, [])
      })
    }
  }

  getDish(callback: (res: any) => void): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id, +this.authService.getUserId())
      .subscribe((res: any) => callback(res));
  }


  initList(array: any[], right: any []){
    array.forEach(el =>{
      this.initDishService.kitchenware.push(el.id)
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
  getKitchenware(callback: (res: any) => void): void {
    this.moderatorService.get_Kitchenware(this.limit, this.page, "", "", "")
      .subscribe((res: any) => callback(res));
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: TransferChange): void {
    ret.list.forEach(el => {
      this.initDishService.changedKitchenware.push(el)
    })
    console.log('nzChange', ret);
    const listKeys = ret.list.map(l => l.key);
    const hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
    this.list = this.list.map(e => {
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
