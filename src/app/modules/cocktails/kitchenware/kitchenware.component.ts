import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {Kitchenware} from "../../core/models/kitchenware";

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
  id: boolean = false
  title: boolean = false
  Category: boolean = false
  toggle: boolean = true
  delKitchenware: Kitchenware = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    isActive: false
}
  constructor(private moderatorService: ModeratorService) {}

  ngOnInit(): void {
    this.search("")
  }

  getKitchenware(limit: number, page: number, key: string, category: string, sortedBy: string): void {
    this.moderatorService.getKitchenware(limit, page, key, category, sortedBy)
      .subscribe((response)=>{
        this.kitchenware = response
        if (this.kitchenware.length === 0) {
          this.page = -1
          this.next()
        }
      });
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
    console.log(this.delKitchenware)
    this.moderatorService.deleteKitchenware(this.delKitchenware.id).subscribe(()=>{
      this.ngOnInit()
    });
  }

  delete(kitchenware: Kitchenware) {
    this.delKitchenware = kitchenware;
    this.toggle = !this.toggle;
  }

  search(sortedBy: string) {
    this.getKitchenware(this.limit, this.page, this.key, this.category, sortedBy);
  }
}
