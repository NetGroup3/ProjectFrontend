import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../services/moderator.service";
import {Ingredient} from "../models/ingredient";
import {Location} from '@angular/common';
import {UploadService} from "../modules/auth/services/client/upload.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.scss']
})
export class AddEditIngredientComponent implements OnInit {

  public img: any;
  description: string = "";
  title: string = "";

  ingridient: Ingredient = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    isActive: false,
    measurement: ""
  };

  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
    private uploadService: UploadService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if(Number(this.route.snapshot.paramMap.get('id')) > 0){
      this.getIngredient();
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
    console.log(this.ingridient)
    this.router.navigate(['/moderator/ingredients'])

  }

  getIngredient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_ingridient(id)
      .subscribe((response:any)=>{
        console.log(response.body)
        this.ingridient = response.body
        console.log(this.ingridient.imageId)
        this.img = this.uploadService.initImage(this.ingridient.imageId);
      });
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.ingridient.imageId = response.public_id;
      this.img = this.uploadService.initImage(this.ingridient.imageId);
      this.onAddClick();
    });
  }

}
