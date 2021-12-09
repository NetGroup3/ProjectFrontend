import {Component, OnInit} from '@angular/core';
import {ModeratorService} from "../../core/services/moderator.service";
import {Kitchenware} from "../../core/models/kitchenware";

@Component({
  selector: 'app-kitchenware',
  templateUrl: './kitchenware.component.html',
  styleUrls: ['./kitchenware.component.scss']
})
export class KitchenwareComponent implements OnInit {
  limit: number = 10;
  page: number = 0;
  Kitchenware: Kitchenware[] = [];
  img: any;
  key: string = ""
  category: string = ""
  sortedBy: string = ""
  id: boolean = false;
  title: boolean = false;
  Category: boolean = false;
  kitchenware: Kitchenware = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    isActive: false
}
  constructor(private moderatorService: ModeratorService) {
  }
  toggle: boolean = true;
  ngOnInit(): void {
    this.search("")
  }

  getKitchenware(limit: number, page: number, key: string, category: string, sortedBy: string): void {
    this.moderatorService.get_Kitchenware(limit, page, key, category, sortedBy)
      .subscribe((response:any)=>{
        console.log(response)
        this.Kitchenware = response
      });
  }

  next() {
    if(this.Kitchenware.length === 0 || this.Kitchenware.length < 10){
      this.page = 0;
      this.ngOnInit();
    }
    else{
      this.page = this.page + 1;
      this.ngOnInit();
    }
  }

  prev() {
    if(this.page > 0) {
      this.page = this.page - 1;
      this.ngOnInit();
    }
  }

  cancel() {
    this.toggle = !this.toggle;
  }
  change() {
    this.toggle = !this.toggle;
  }

  ok() {
    this.toggle = !this.toggle;
    console.log(this.kitchenware)
    this.moderatorService.delete_kitchenware(this.kitchenware.id).subscribe((response:any)=>{
      console.log(response)
    });
    location.reload();
  }
  delete(kitchenware: Kitchenware) {
    this.kitchenware = kitchenware;
    this.toggle = !this.toggle;
  }

  search(sortedBy: string) {
    this.getKitchenware(this.limit, this.page, this.key, this.category, sortedBy);
  }
}
