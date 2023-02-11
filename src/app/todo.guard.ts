import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let url: string = state.url;
    return this.checkLogin(url);
  }


  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url)
    let val: string|any = localStorage.getItem('isUserLoggedIn');

    if (val != null && val == "true") {
      if (url == "/login") {
        return this.router.parseUrl('/todo');
      }
      else {
        return true;
      }
        } else {
      return this.router.parseUrl('/login');
        }
  }
}
