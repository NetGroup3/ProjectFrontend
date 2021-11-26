import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import { Location } from '@angular/common';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {UploadService} from "../modules/auth/services/client/upload.service";

@Component({
  selector: 'app-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.scss']
})
export class AddEditIngredientComponent implements OnInit {

  description: string = ""
  title: string = ""
  ingridient: Ingredient = {
    id: 0,
    title: "",
    description: "",
    category: "",
    image_id: "",
    is_active: false,
    measurement: ""
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
      this.getIngredient();
      console.log(this.ingridient.image_id);
      this.img = this.initImage();
    }

  }
  goBack(): void {
    this.location.back();
  }

  onAddClick(): void{
    console.log(this.ingridient)
    if(this.ingridient.id === 0){
      this.moderatorService.add_ingredient(this.ingridient).subscribe((response:any)=>{
      console.log(response)
      });
    }
    else {
      this.moderatorService.edit_ingredient(this.ingridient).subscribe((response:any)=>{
        console.log(response)
      });
    }
  }

  getIngredient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_ingridient(id)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.ingridient = response.body
        this.img = this.initImage();
      });
  }

  initImage(): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(this.ingridient.image_id)
      .resize(thumbnail().width(180).height(180))
      .roundCorners(byRadius(10));
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.ingridient.image_id = response.public_id;
      this.img = this.initImage();
      this.onAddClick();
    });
  }

}
