import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(
    public readonly userService: UserService,
  ) { }

  users: User[] =[];
  isUserLoggedIn: boolean = false;

  login(userName: string, password: string): Observable<any> {
    console.log(userName);
    console.log(password);
    this.users = this.userService.userList
    let checking = this.users.find(x => x.username === userName && x.password === password);
    console.log(checking);
    if (checking !== undefined) {
      this.isUserLoggedIn = true
      localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false");
      localStorage.setItem('getUserName', userName);
      if (userName == "admin") {
        console.log("he is admin");
        localStorage.setItem('isAdmin', "true" );
      }
    }
  
    return of(this.isUserLoggedIn).pipe(
      delay(1000),
      tap(val => {
        console.log("Is User Authentication is successful: " + val);
      })
    );
  }

  logout(): void {
    this.isUserLoggedIn = false;
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('getUserName');
    localStorage.removeItem('isAdmin');
  }


}
