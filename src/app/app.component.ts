import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './service/auth.service';
/**
* @title login demo
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,) { }
  username: string = "";
  password: string = "";
  show: boolean = false;
  title = 'todomvc-app'

  isUserLoggedIn = false;

  ngOnInit() {
    let storeData = localStorage.getItem("isUserLoggedIn");
    console.log("StoreData: " + storeData);
    if (storeData != null && storeData == "true") {
      this.isUserLoggedIn = true;
    }
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
}
