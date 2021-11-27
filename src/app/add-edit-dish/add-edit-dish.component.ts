import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../models/ingredient";
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Location} from "@angular/common";
import {UploadService} from "../modules/auth/services/client/upload.service";
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {Dish} from "../models/dish";

@Component({
  selector: 'app-add-edit-dish',
  templateUrl: './add-edit-dish.component.html',
  styleUrls: ['./add-edit-dish.component.scss']
})
export class AddEditDishComponent implements OnInit {

  description: string = ""
  title: string = ""
  dish: Dish = {
    id: 0,
    title: "",
    image_id: "",
  };
  public img: any;
//  public img: CloudinaryImage = this.initImage();
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
    private uploadService: UploadService
  ) {}
  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get('id')) > 0){
      this.getDish();
      console.log(this.dish.image_id);
      this.img = this.initImage();
    }

  }
  goBack(): void {
    this.location.back();
  }

  onAddClick(): void{
    console.log(this.dish)
    if(this.dish.id === 0){
      this.moderatorService.add_dish(this.dish).subscribe((response:any)=>{
        console.log(response)
      });
    }
    else {
      this.moderatorService.edit_dish(this.dish).subscribe((response:any)=>{
        console.log(response)
      });
    }
  }

  getDish(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_dish(id)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.dish = response.body
        this.img = this.initImage();
      });
  }

  initImage(): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.dish.image_id)
      .resize(thumbnail().width(180).height(180))
      .roundCorners(byRadius(10));
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.dish.image_id = response.public_id;
      this.img = this.initImage();
      this.onAddClick();
    });
  }


}
