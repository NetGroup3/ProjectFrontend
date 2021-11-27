import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";
  private readonly USER_ID: string = "USER_ID";
  private readonly USER_FIRSTNAME: string = "USER_FIRSTNAME";
  private readonly USER_LASTNAME: string = "USER_LASTNAME";
  private readonly USER_ROLE: string = "USER_ROLE";
  private readonly USER_IMAGE_ID: string = "USER_IMAGE_ID";
  private token: string = "";
  private id: string = "";
  private firstname: string = "";
  private lastname: string = "";
  private role: string = "";
  private imageId: string = "";

  public loadUserData(): void{
    this.id = <string> localStorage.getItem(this.USER_ID);
    this.firstname = <string> localStorage.getItem(this.USER_FIRSTNAME);
    this.lastname = <string> localStorage.getItem(this.USER_LASTNAME);
    this.role = <string> localStorage.getItem(this.USER_ROLE);
    this.imageId = <string> localStorage.getItem(this.USER_IMAGE_ID);
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

  setImageId(imageId: string) {
    this.imageId = imageId;
    localStorage.setItem(this.USER_IMAGE_ID, this.imageId);
  }

  public setUserData(id: string, firstname: string, lastname: string, role: string, imageId: string): void{
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
    this.imageId = imageId
    localStorage.setItem(this.USER_ID, this.id);
    localStorage.setItem(this.USER_FIRSTNAME, this.firstname);
    localStorage.setItem(this.USER_LASTNAME, this.lastname);
    localStorage.setItem(this.USER_ROLE, this.role);
    localStorage.setItem(this.USER_IMAGE_ID, this.imageId);
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

  public getImageId(): string {
    return this.imageId;
  }
}
