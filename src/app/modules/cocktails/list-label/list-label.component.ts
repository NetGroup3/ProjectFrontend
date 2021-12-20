import { Component, OnInit } from '@angular/core';
import {TransferChange, TransferItem, TransferSelectChange} from "ng-zorro-antd/transfer";
import {Kitchenware} from "../../core/models/kitchenware";
import {ModeratorService} from "../../core/services/moderator.service";
import {InitDishService} from "../../core/services/init-dish.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../auth/services/client/auth.service";
import {Label} from "../../core/models/label";
import {DishAll} from "../../core/models/dishAll";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {Subscription} from "rxjs";

@AutoUnsubscribe()
@Component({
  selector: 'app-list-label',
  templateUrl: './list-label.component.html',
  styleUrls: ['./list-label.component.scss']
})
export class ListLabelComponent implements OnInit {

  public list: TransferItem[] = []
  public $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[];
  public disabled = false
  public showSearch = false
  public limit = 10
  public page = 0
  subscriptions: Subscription = new Subscription();

  constructor(private moderatorService: ModeratorService,
              private initDishService: InitDishService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if(!isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      this.getLabels((all: Label[]) => {
        this.getDish((res: DishAll) => {
          this.initList(all, res.labels)
        })
      })
    }
    else {
      this.getLabels((all: Label[]) => {
        this.initList(all, [])
      })
    }

  }

  initList(array: any[], right: any []){
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

  getLabels(callback: (res: Label[]) => void): void {
    this.subscriptions.add(
      this.moderatorService.getLabels(this.limit, this.page)
      .subscribe((res: Label[]) => callback(res)))
  }

  getDish(callback: (res: DishAll) => void): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.moderatorService.getDish(id)
      .subscribe((res: DishAll) => callback(res)))
  }

  change(ret: TransferChange): void {
    let listKeys = ret.list.map(l => l.key);
    let hasOwnKey = (e: TransferItem): boolean => e.hasOwnProperty('key');
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

  ngOnDestroy() {}

}
