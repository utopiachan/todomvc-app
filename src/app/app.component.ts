import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from './service/user.service';
import { ReloadComponent } from './service/reload-component';
/**
* @title login demo
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ReloadComponent {
  constructor(public override router: Router,
    public readonly userService: UserService
  ) {
    super(router);
    console.log("Inside AppComponent Constructor");
  }

  username: string = "";
  password: string = "";
  show: boolean = false;
  title = 'todomvc-app'
  isUserLoggedIn = false;
  isAdmin = false;

  //ngOnInit():check if the current use is admin or is logged in to display different button link 
  override ngOnInit() {
    let storeData = localStorage.getItem("isUserLoggedIn");
    console.log("StoreData: " + storeData);
    if (storeData != null && storeData == "true") {
      this.isUserLoggedIn = true;
    }

    let checkAdmin = localStorage.getItem("isAdmin");
    console.log("isAdmin: " + checkAdmin);
    if (checkAdmin != null && checkAdmin == "true") {
      this.isAdmin = true;
    }
    this.getUser();
  }

  submit() {
    console.log("user name is " + this.username)
    console.log("password is "+ this.password)
    this.clear();
  }
  clear() {
    this.username = "";
    this.password = "";
    this.show = true;
  }

  redirect() {
    this.router.navigate(['todo']);
  }

  reloadCurrent() {
    this.reloadPage();
  }

  getUser() {
    this.userService.getUsers()
  }
}
