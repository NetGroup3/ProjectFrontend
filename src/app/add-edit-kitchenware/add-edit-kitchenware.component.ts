import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../models/ingredient";
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Location} from "@angular/common";
import {Kitchenware} from "../models/kitchenware";

@Component({
  selector: 'app-add-edit-kitchenware',
  templateUrl: './add-edit-kitchenware.component.html',
  styleUrls: ['./add-edit-kitchenware.component.scss']
})
export class AddEditKitchenwareComponent implements OnInit {

  kitchenware: Kitchenware = {
    id: 0,
    title: "",
    description: "",
    category: "",
    image_id: 0,
    is_active: false,
  };
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location
  ) {}
  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get('id')) > 0){
      this.getKitchenware();
    }

  }
  goBack(): void {
    this.location.back();
  }

  onAddClick():void{
    console.log(this.kitchenware)
    if(this.kitchenware.id === 0){
      this.moderatorService.add_kitchenware(this.kitchenware).subscribe((response:any)=>{
        console.log(response)
      });
    }
    else {
      this.moderatorService.edit_kitchenware(this.kitchenware).subscribe((response:any)=>{
        console.log(response)
      });
    }
  }

  getKitchenware(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_kitchenware(id)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.kitchenware = response.body
      });
  }


}
