import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  todoContent = '';

  constructor(
    private readonly todoService: TodoService
  ) { }

  ngOnInit(): void {
  }

  addTodo(): void {
    if (this.todoContent.trim().length > 0) {
      this.todoService.todoList.push({
        id: this.todoService.todoList.length,
        content: this.todoContent,
        completed: false,
        editing: false
      });
      this.todoContent = '';
    }
  }

}
