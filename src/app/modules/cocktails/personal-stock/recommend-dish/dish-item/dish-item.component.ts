import {Component, Input, OnInit} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {UploadService} from "../../../../auth/services/client/upload.service";
import {DishFormat} from "../../../../core/models/dishFormat";
import {ModeratorService} from "../../../../core/services/moderator.service";
import {AuthService} from "../../../../auth/services/client/auth.service";

@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss']
})
export class DishItemComponent implements OnInit {

  @Input() dish!: DishFormat;
  public img!: CloudinaryImage;
  constructor(
    private uploadService: UploadService,
    private moderatorService: ModeratorService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.img = this.initImage();
  }

  initImage(): CloudinaryImage {
    return this.uploadService.initImageWithSizeAndRadius(this.dish.imageId, 300, 350, 0);
  }

  favouriteToggle (favourite : boolean, dish : number) : boolean {
    if (favourite) return this.moderatorService.removeFavourite(dish).subscribe().closed
    return !this.moderatorService.addFavourite({
      user: Number(this.authService.getUserId()),
      dish: dish
    }).subscribe().closed
  }

}
