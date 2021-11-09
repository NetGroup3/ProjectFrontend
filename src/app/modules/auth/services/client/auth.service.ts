import { Injectable } from '@angular/core';
import {AuthRestService} from "../rest/auth-rest.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRestService: AuthRestService) { }

  //логіка збереження токіна, збереження юзера
}
