import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Location} from "@angular/common";
import {Kitchenware} from "../models/kitchenware";
import {UploadService} from "../modules/auth/services/client/upload.service";

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
    image_id: "",
    is_active: false,
  };
  public img: any;
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
  private uploadService: UploadService
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
        this.img = this.uploadService.initImage(this.kitchenware.image_id);
      });
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.kitchenware.image_id = response.public_id;
      this.img = this.uploadService.initImage(this.kitchenware.image_id);
      this.onAddClick();
    });
  }

}
