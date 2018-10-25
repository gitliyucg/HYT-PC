import { Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {

  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.checkLogin(url);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (localStorage['token'] !== null && localStorage['token'] !== undefined) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
