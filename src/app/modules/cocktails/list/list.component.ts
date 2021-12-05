import {Component, NgModule, OnInit} from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {ModeratorService} from "../../../services/moderator.service";
import {Ingredient} from "../../models/ingredient";
import {AddEditDishComponent} from "../add-edit-dish/add-edit-dish.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {

  changes: any [] = []

  list: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  disabled = false;
  showSearch = false;
  ingredients: Ingredient [] = [];
  limit: number = 10;
  page: number = 0;

  constructor(private moderatorService: ModeratorService) {
  }

  ngOnInit(): void {

    this.getIngredients((res: any) => {
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
  getIngredients(callback: (res: any) => void): void {
    this.moderatorService.get_ingridients(this.limit, this.page, "", "", "")
      .subscribe((res: any) => callback(res));
  }

  select(ret: TransferSelectChange): void {
    console.log('nzSelectChange', ret);
  }

  change(ret: TransferChange): void {
    ret.list.forEach(el => {
      this.changes.push(el)
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


  check():any {
    const ch = this.changes
    console.log(1111)
    console.log(this.changes)
    return ch
  }
}
