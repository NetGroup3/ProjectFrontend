import {Component, OnInit} from '@angular/core';
import {TransferChange, TransferItem} from "ng-zorro-antd/transfer";
import {ModeratorService} from "../../core/services/moderator.service";
import {Ingredient} from "../../core/models/ingredient";
import {InitDishService} from "../../core/services/init-dish.service";
import {ActivatedRoute} from "@angular/router";
import {DishAll} from "../../core/models/dishAll";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {Subscription} from "rxjs";

@AutoUnsubscribe()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {
  public id = Number(this.route.snapshot.paramMap.get('id'))
  public list: TransferItem[] = []
  public $asTransferItems = (data: unknown): TransferItem[] => data as TransferItem[]
  public disabled = false
  public showSearch = false
  public limit = 50
  public page = 0
  subscriptions: Subscription = new Subscription();

  constructor(private moderatorService: ModeratorService,
              private initDishService: InitDishService,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    if (!isNaN(Number(this.route.snapshot.paramMap.get('id')))) {
      this.getIngredients((all: Ingredient[]) => {
        this.getDish((res: DishAll) => {
          this.initList(all, res.ingredients)
        })

      })
    } else {
      this.getIngredients((all: Ingredient[]) => {
        this.initList(all, [])
      })
    }
  }

  initList(array: Ingredient[], right: Ingredient []) {
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
        if (el.key == right[i].id) {
          el.direction = 'right'
        }
      })
    }
    this.initDishService.listIngredients = this.list
  }

  getIngredients(callback: (res: Ingredient[]) => void): void {
    this.subscriptions.add(
      this.moderatorService.getIngredients(
        this.limit, this.page, "", "", "")
        .subscribe((res: Ingredient[]) => callback(res)))
  }

  getDish(callback: (res: any) => void): void {
    this.subscriptions.add(
      this.moderatorService.getDish(this.id)
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
    this.initDishService.listIngredients = this.list
  }

  ngOnDestroy() {}
}
