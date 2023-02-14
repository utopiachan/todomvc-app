import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { UserService } from '../service/user.service';
import { Todo } from '../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //para:   rootURL:link to our api server,todoContent: storing input from user, todoForm: collect information to interact with database
           
  rootURL = '/api';
  todoContent = '';
  todoForm: FormGroup|any;

  private _todo = new ReplaySubject<Todo>(1);
  set todo(value: Todo) { this._todo.next(value); }

  constructor(
    private readonly todoService: TodoService,
    public readonly userService: UserService,
    public http: HttpClient,
    private formBuilder: FormBuilder
  ) { }
  //setting up the form formate for use
  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      id: [''],
      user_name: [''],
      content: [''],
      completed: [false],
      editing: [false],
    });
  }

  
  //gathering information from user, push it to local storage and database
  addTodo() {
    if (this.todoContent.trim().length > 0) {
      let username = localStorage.getItem('getUserName');
      this.todoService.todoList.push({
        id: this.todoService.todoList.length+1,
        user_name: username,
        content: this.todoContent,
        completed: false,
        editing: false
      });

      this.todoForm.value.id = this.todoService.todoList.length;
      this.todoForm.value.user_name = username;
      this.todoForm.value.content = this.todoContent;
      this.todoContent = '';

      const headers = { 'content-type': 'application/json' };
      console.log(this.todoForm)
      const body = this.todoForm.value;
      console.log(body);
      const testing = JSON.stringify(body);
      console.log("username=" + localStorage.getItem('getUserName'))
      return this.http.post(this.rootURL + '/todo_item', { todo:testing }, { headers }).toPromise().then((result) => {
        return result;
      }).catch(error => { throw error });
    }
    else return false;

  }
  
    
  }


