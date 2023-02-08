import { Component } from '@angular/core';
import { Router } from '@angular/router'
/**
* @title login demo
*/
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) { }
  username: string = "";
  password: string = "";
  show: boolean = false;
  title = 'todomvc-app'
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
