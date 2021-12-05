import { Component, OnInit } from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {Kitchenware} from "../../models/kitchenware";
import {ModeratorService} from "../../../services/moderator.service";

@Component({
  selector: 'app-list-label',
  templateUrl: './list-label.component.html',
  styleUrls: ['./list-label.component.scss']
})
export class ListLabelComponent implements OnInit {


  changes: any [] = []
  list: TransferItem[] = [];
  $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  disabled = false;
  showSearch = false;
  kitchenware: Kitchenware [] = [];
  limit: number = 10;
  page: number = 0;

  constructor(private moderatorService: ModeratorService) {
  }

  ngOnInit(): void {

    this.getLabels((res: any) => {
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
  getLabels(callback: (res: any) => void): void {
    this.moderatorService.getLabels(this.limit, this.page)
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
    console.log(this.changes)
    return ch
  }


}
