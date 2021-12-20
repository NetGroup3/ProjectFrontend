import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ModeratorService} from "../../core/services/moderator.service";
import {Ingredient} from "../../core/models/ingredient";
import {Location} from '@angular/common';
import {UploadService} from "../../auth/services/client/upload.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-add-edit-ingredient',
  templateUrl: './add-edit-ingredient.component.html',
  styleUrls: ['./add-edit-ingredient.component.scss']
})
export class AddEditIngredientComponent implements OnInit {

  public img: any;
  subscriptions: Subscription = new Subscription();
  ingridient: Ingredient = {
    id: 0,
    title: "",
    description: "",
    category: "",
    imageId: "",
    active: false,
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
    if(this.ingridient.id === 0){
      this.subscriptions.add(
        this.moderatorService.addIngredient(this.ingridient).subscribe((response:any)=>{
        this.router.navigate(['/moderator/ingredients'])
      }))
    }
    else {
      this.subscriptions.add(
        this.moderatorService.editIngredient(this.ingridient).subscribe((response:any)=>{
        this.router.navigate(['/moderator/ingredients'])
      }))
    }

  }

  getIngredient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscriptions.add(
      this.moderatorService.getIngredient(id)
      .subscribe((response:Ingredient)=>{
        this.ingridient = response
        this.img = this.uploadService.initImage(this.ingridient.imageId);
      }))
  }

  onFileSelect($event: any) {
    this.subscriptions.add(
      this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.ingridient.imageId = response.public_id;
      this.img = this.uploadService.initImage(this.ingridient.imageId);
    }))
  }

  ngOnDestroy() {}
}
