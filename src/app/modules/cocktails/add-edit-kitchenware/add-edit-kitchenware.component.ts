import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ModeratorService} from "../../core/services/moderator.service";
import {Location} from "@angular/common";
import {Kitchenware} from "../../core/models/kitchenware";
import {UploadService} from "../../auth/services/client/upload.service";

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
    imageId: "",
    isActive: false,
  };
  public img: any;
  constructor(
    private route: ActivatedRoute,
    private moderatorService: ModeratorService,
    private location: Location,
  private uploadService: UploadService,
    private router: Router
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
    console.log(this.kitchenware)
    this.router.navigate(['/moderator/kitchenware'])
  }

  getKitchenware(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.moderatorService.get_kitchenware(id)
      .subscribe((response:any)=>{
        console.log(response)
        this.kitchenware = response
        this.img = this.uploadService.initImage(this.kitchenware.imageId);
      });
  }

  onFileSelect($event: any) {
    this.uploadService.onUpLoad($event.target.files[0]).subscribe(response =>{
      this.kitchenware.imageId = response.public_id;
      this.img = this.uploadService.initImage(this.kitchenware.imageId);
      //this.onAddClick();
    });
  }

}
