import { Component } from '@angular/core';
import { Router } from '@angular/router'
/**
* @title login demo
*/
@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) { }
  username: string = "";
  password: string = "";
  show: boolean = false;
  title = 'todomvc-app'
  redirect() {
    this.router.navigate(['todo']);
  }
  submit() {
    console.log("user name is " + this.username)
    console.log("password is " + this.password)
    this.clear();
    this.redirect();
  }
  clear() {
    this.username = "";
    this.password = "";
    this.show = true;
  }

}
