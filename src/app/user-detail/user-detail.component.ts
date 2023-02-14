import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  #userList: User[] = [];
  displayedColumns: string[] = ['User Id', 'User Name', 'Translate times'];
  dataSource = this.#userList;
  constructor(
    public readonly userService: UserService,
  ) { }

  ngOnInit(): void {
    this.#userList = this.userService.userList;
    console.log(this.#userList);
    this.dataSource = this.#userList;
  }


}
