import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./modules/auth/services/client/auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private tokenService: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(this.tokenService.getUserRole())
    if(this.tokenService.getUserRole() === 'USER'){
      return true;
    }
    else if(this.tokenService.getUserRole() === 'MODERATOR'){
      //this.router.navigate(['/moderator'])
      return true;
    }
    else if(this.tokenService.getUserRole() === 'ADMIN'){
      //this.router.navigate(['/admin'])
      return true;
    }
    else {
      this.router.navigate(['/login'])
      return false;
    }
  }
}
