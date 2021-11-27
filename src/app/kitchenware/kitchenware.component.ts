import { Component, OnInit } from '@angular/core';
import {ModeratorService} from "../services/moderator.service";
import {Kitchenware} from "../models/kitchenware";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Ingredient} from "../models/ingredient";

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
    this.getKitchenware(this.limit, this.page);
  }

  getKitchenware(limit: number, page: number): void {
    this.moderatorService.get_Kitchenware(limit, page)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.Kitchenware = response.body
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

  initImage(imageId: string): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(imageId)
      .resize(thumbnail().width(100).height(100))
      .roundCorners(byRadius(10));
  }

}
