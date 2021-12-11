import { Component, OnInit } from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {Kitchenware} from "../../core/models/kitchenware";
import {ModeratorService} from "../../core/services/moderator.service";
import {InitDishService} from "../../core/services/init-dish.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/services/client/auth.service";
import {Label} from "../../core/models/label";

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
  labels: Label [] = [];
  limit: number = 100;
  page: number = 0;

  constructor(private moderatorService: ModeratorService,
              private initDishService: InitDishService,
              private route: ActivatedRoute,
              private authService: AuthService,) {
  }

  ngOnInit(): void {
    if(!isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      this.getLabels((all: any) => {
        this.getDish((res: any) => {
          console.log(res.labels)
          this.initList(all, res.labels)
        })
      })
    }
    else {
      this.getLabels((all: any) => {
        this.initList(all, [])
      })
    }

  }

  initList(array: any[], right: any []){
    array.forEach(el =>{
      this.initDishService.label.push(el.id)
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

    for (let i = 0; i < right.length; i++) {
      this.list.forEach(el => {
        if(el.key == right[i].id){
          el.direction = 'right'
        }
      })
    }
    this.initDishService.listLabels = this.list
  }

  getLabels(callback: (res: any) => void): void {
    this.moderatorService.getLabels(this.limit, this.page)
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
    ret.list.forEach(el => {
      this.initDishService.changedLabel.push(el)
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
    this.initDishService.listLabels = this.list
  }


}
