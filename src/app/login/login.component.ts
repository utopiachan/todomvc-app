import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
//para: userName & password: storing input from client formData:formcontrol for use to quickly signin as admin
  userName!: string;
  password!: string;
  formData: FormGroup|any;

  constructor(private authService: AuthService, private router: Router, ) { }

  ngOnInit() {
    this.formData = new FormGroup({
      userName: new FormControl("admin"),
      password: new FormControl("admin"),
    });
  }
  //submit the input data from client to authenicate if service is available for user.
  onClickSubmit(data: any) {
    this.userName = data.userName;
    this.password = data.password;

    console.log("Login page: " + this.userName);
    console.log("Login page: " + this.password);

    this.authService.login(this.userName, this.password)
      .subscribe(data => {
        console.log("Is Login Success: " + data);
        if (data) {
          this.router.navigate(['/todo'])
          alert("login success!")
        } else {
          alert("username or password incorrect, please try again")
        };
      });
  }
}
