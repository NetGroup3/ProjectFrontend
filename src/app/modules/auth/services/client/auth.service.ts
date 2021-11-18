import { Injectable } from '@angular/core';
import {AuthRestService} from "../rest/auth-rest.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRestService: AuthRestService) { }

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";
  private token: string = "";

  public loadToken(): void{
    const token: string = <string> localStorage.getItem(this.TOKEN_KEY);
    this.token = token;
  }

  public setToken(token: string): void{
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, this.token);
  }

  public getToken(): string {
    return this.token;
  }
}
