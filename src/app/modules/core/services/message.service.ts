import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


    success(title: string): void{
      console.log("success");
  }

}
