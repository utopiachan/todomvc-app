import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  //checkLogin():guard user detail page can only be accessed from admin.
  checkLogin(url: string): true | UrlTree {
    console.log("Url: " + url)
    let val: string | any = localStorage.getItem('isAdmin');

    if (val != null && val == "true") {
      if (url == "/login") {
        return this.router.parseUrl('/detail');
      }
      else {
        return true;
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}


