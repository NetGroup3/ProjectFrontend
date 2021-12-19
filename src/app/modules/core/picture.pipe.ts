import {Pipe, PipeTransform} from '@angular/core';
import {CloudinaryImage} from "@cloudinary/url-gen";
import {UploadService} from "../auth/services/client/upload.service";

@Pipe({
  name: 'getPicture'
})
export class PicturePipe implements PipeTransform {

  private with: number = 150;
  private height: number = 150;
  private radius: number = 10;

  constructor(
    private uploadService: UploadService,
  ) { }

  transform(imageId: string): CloudinaryImage {
    return this.uploadService.initImageWithSizeAndRadius(imageId, this.with, this.height, this.radius);
  }
}
