import { Pipe, PipeTransform } from '@angular/core';
import {Cloudinary, CloudinaryImage} from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

@Pipe({
  name: 'getPicture'
})
export class PicturePipe implements PipeTransform {
  transform(imageId: string): CloudinaryImage {
    const cld = new Cloudinary({cloud: {cloudName: 'djcak19nu'}});
    return cld.image(imageId)
      .resize(thumbnail().width(150).height(150))
      .roundCorners(byRadius(10));
  }
}
