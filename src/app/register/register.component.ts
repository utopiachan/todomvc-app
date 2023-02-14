import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router'
import { User } from '../models/user.model';
import { FormGroup, FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private router: Router,
    private readonly userservice: UserService,
    private formBuilder: FormBuilder
  ) { }
  users: User[] = [];
  username: string = "";
  password: string = "";
  show: boolean = false;
  title = 'Registration'
  registerForm: FormGroup | any;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      user_id: [''],
      username: [''],
      password: [''],
      number_translate: [0],
    });
  }

  redirect() {
    this.router.navigate(['todo']);
  }

  register(): void {
    this.users = this.userservice.userList
    let checking = this.users.find(x => x.username === this.username);
    if (checking != undefined) {
      alert("user name has been used,try again");
      this.router.navigate(['register']);
    } else {
      if (this.username.trim().length > 0) {
        this.userservice.userList.push({
          user_id: this.userservice.userList.length,
          username: this.username,
          password: this.password,
          number_translate: 0,
        });
        console.log('success');
        this.redirect();

        this.registerForm.value.user_id = this.userservice.userList.length;
        this.registerForm.value.username = this.username;
        this.registerForm.value.password = this.password;
        this.userservice.registration(this.registerForm);
        console.log(this.registerForm.value);
      }
    }
  }


}
