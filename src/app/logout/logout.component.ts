import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {
  


  constructor(
    private authService: AuthService,
    private router: Router,) { }
  //OnInit():clear local storage and loggin out the user
  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/login']);
    
  }

}
