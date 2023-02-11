import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  #userList: User[] = [];
  todoContent = '';

  constructor(
    private readonly todoService: TodoService,
    public readonly userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  addTodo(): void {
    if (this.todoContent.trim().length > 0) {
      let username = localStorage.getItem('getUserName');
      this.todoService.todoList.push({
        user_name: username,
        id: this.todoService.todoList.length,
        content: this.todoContent,
        completed: false,
        editing: false
      });
      this.todoContent = '';
      console.log("username=" + localStorage.getItem('getUserName'))
    }
  }

}
