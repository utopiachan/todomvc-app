import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private readonly userservice: UserService
  ) { }
  username: string = "";
  password: string = "";
  show: boolean = false;
  title = 'Registration'

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate(['todo']);
  }

  register(): void {
    if (this.username.trim().length > 0) {
      this.userservice.userList.push({
        user_id: this.userservice.userList.length,
        username: this.username,
        password: this.password,
        number_translate: 0,
      });
      console.log('success');
      this.redirect();
      }
    }
    
  }




