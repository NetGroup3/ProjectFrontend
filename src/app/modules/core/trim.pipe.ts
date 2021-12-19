import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'trimToSize'
})
export class TrimPipe implements PipeTransform {

  transform(longString: string): string {
    if(longString.length<85)
      return longString;
    return longString.substr(0, 85)+"...";
  }

}
