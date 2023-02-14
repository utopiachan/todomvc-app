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
  //para:users:store userlist and compare with user input to check if the username is taken
  //username & password: storing user input
  //registerForm:gathering detail of user and send to database
  users: User[] = [];
  username: string = "";
  password: string = "";
  title = 'Registration'
  registerForm: FormGroup | any;

  //ngOnInit():prepare register form formate for database use
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
  //register():compare user name with existing database,if username is available then send registration from to database.
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
        alert("Register Success");
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
