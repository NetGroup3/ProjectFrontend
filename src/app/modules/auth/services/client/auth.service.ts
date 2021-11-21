import { Injectable } from '@angular/core';
import {AuthRestService} from "../rest/auth-rest.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authRestService: AuthRestService) { }

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";
  private readonly USER_ID: string = "USER_ID";
  private readonly USER_FIRSTNAME: string = "USER_FIRSTNAME";
  private readonly USER_LASTNAME: string = "USER_LASTNAME";
  private readonly USER_ROLE: string = "USER_ROLE";
  private token: string = "";
  private id: string = "";
  private firstname: string = "";
  private lastname: string = "";
  private role: string = "";

  public loadUserData(): void{
    this.id = <string> localStorage.getItem(this.USER_ID);
    this.firstname = <string> localStorage.getItem(this.USER_FIRSTNAME);
    this.lastname = <string> localStorage.getItem(this.USER_LASTNAME);
    this.role = <string> localStorage.getItem(this.USER_ROLE);
  }

  public loadToken(): void{
    this.token = <string> localStorage.getItem(this.TOKEN_KEY);
  }

  public setUserFirstname(firstname: string): void {
    this.firstname = firstname;
    localStorage.setItem(this.USER_FIRSTNAME, this.firstname);
  }

  public serUserLastname(lastname: string) {
    this.lastname = lastname;
    localStorage.setItem(this.USER_LASTNAME, this.lastname)
  }

  public setUserData(id: string, firstname: string, lastname: string, role: string ): void{
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
    localStorage.setItem(this.USER_ID, this.id);
    localStorage.setItem(this.USER_FIRSTNAME, this.firstname);
    localStorage.setItem(this.USER_LASTNAME, this.lastname);
    localStorage.setItem(this.USER_ROLE, this.role);
  }

  public setToken(token: string): void{
    this.token = token;
    localStorage.setItem(this.TOKEN_KEY, this.token);
  }

  public getToken(): string {
    return this.token;
  }

  public getUserId(): string {
    return this.id;
  }

  public getUserFirstname(): string {
    return this.firstname;
  }

  public getUserLastname(): string {
    return this.lastname;
  }

  public getUserRole(): string {
    return this.role;
  }


}
