import { Component, OnInit } from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {Ingredient} from "../../models/ingredient";
import {ModeratorService} from "../../../services/moderator.service";
import {Kitchenware} from "../../models/kitchenware";
import {InitDishService} from "../../../services/init-dish.service";

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
              private initDishService: InitDishService) {
  }

  ngOnInit(): void {

    this.getKitchenware((res: any) => {
      this.initList(res)
    })

  }

  initList(array: any[]){
    this.list = []
    for (let i = 0; i < array.length; i++) {
      this.list.push({
        key: array[i].id.toString(),
        title: array[i].title,
        description: `description of content${i + 1}`,
        //disabled: i % 4 === 0,
        checked: false
      });
    }
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
