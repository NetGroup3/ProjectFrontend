import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {Kitchenware} from "../../core/models/kitchenware";
import {debounceTime} from "rxjs/operators";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";
import {Subscription} from "rxjs";

@AutoUnsubscribe()
@Component({
  selector: 'app-kitchenware',
  templateUrl: './kitchenware.component.html',
  styleUrls: ['./kitchenware.component.scss']
})
export class KitchenwareComponent implements OnInit {
  limit: number = 10
  page: number = 0
  kitchenware: Kitchenware[] = []
  img: any
  key: string = ""
  category: string = ""
  sortedBy: string = ""
  toggle: boolean = true
  delKitchenware: Kitchenware = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    isActive: false
  }
  subscriptions: Subscription = new Subscription()

  constructor(private moderatorService: ModeratorService) {}

  ngOnInit(): void {
    this.search("")
  }

  getKitchenware(limit: number, page: number, key: string, category: string, sortedBy: string): void {
    this.subscriptions.add(
      this.moderatorService.getKitchenware(limit, page, key, category, sortedBy)
      .pipe(debounceTime(300))
      .subscribe((response: Kitchenware[])=>{
        this.kitchenware = response
        if (this.kitchenware.length === 0) {
          this.page = -1
          this.next()
        }
      }))
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

  change() {
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    this.subscriptions.add(
      this.moderatorService.deleteKitchenware(this.delKitchenware.id).subscribe(()=>{
      this.ngOnInit()
    }))
  }

  delete(kitchenware: Kitchenware) {
    this.delKitchenware = kitchenware;
    this.toggle = !this.toggle;
  }

  search(sortedBy: string) {
    this.getKitchenware(this.limit, this.page, this.key, this.category, sortedBy);
  }

  ngOnDestroy() {}
}
