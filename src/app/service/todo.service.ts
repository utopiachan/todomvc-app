import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder ,FormGroup } from '@angular/forms';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  //para: allCompleted: mark all todos to complete status. #todolist:store todo data for local use
  //username: store the current user to show the todos inputed by user.
  //registerForm: register the todo information for database communication
  allCompleted = false;
  uncompletedCount = 0;
  #todoList: Todo[] = [];
  username = localStorage.getItem('getUserName');
  registerForm: FormGroup | any;

  get todoList(): Todo[] {
    return this.#todoList;
  }
  
  constructor(
    public http: HttpClient,
      private formBuilder: FormBuilder
  ) { }

  //deleteTodo():delete todo locally from todolist and send delete request to database
  deleteTodo(todo: Todo): void {
    var todoID = todo.id;
    this.#todoList = this.#todoList.filter(it => it.id !== todo.id);
    this.allCompleted = this.#todoList.filter(it => !it.completed).length === 0;
    this.uncompletedCount = this.#todoList.filter(it => !it.completed).length;
    this.deleteTodoData(todoID);
  }
  //toggleTodo():check the todo and update it's status
  toggleTodo(completed: boolean, todo?: Todo): void {
    if (!todo) {
      this.#todoList.forEach(it => it.completed = completed);
      for (var todoAll of this.#todoList) {
        if (todoAll.completed == true) { this.updateCompleted(todoAll.id, true) }
      }
      for (var todoAll of this.#todoList) {
        if (todoAll.completed == false) { this.updateCompleted(todoAll.id, false) }
      }
      this.allCompleted = completed;
    } else {
      if (todo != undefined) {
        var todoID = todo.id;
        todo.completed = completed;
        if (todo.completed == true) {
          this.updateCompleted(todoID, true);
        }
        if (todo.completed == false) {
          this.updateCompleted(todoID, false);
        }
        this.allCompleted = this.#todoList.filter(it => !it.completed).length === 0;
      }
    }
      this.uncompletedCount = this.#todoList.filter(it => !it.completed).length;
    
  }
  //clearCompletedTodos():delete todos with completed=true
  clearCompletedTodos(): void {
    for (var todo of this.#todoList) {
      if (todo.completed == true) { this.deleteTodoData(todo.id) }
    }
    this.#todoList = this.#todoList.filter(it => !it.completed);
    this.allCompleted = false;
    this.uncompletedCount = this.#todoList.length;
  }
  //getTodo(): retreive todoList from database
  getTodo() {
    return this.http.get<any>('http://localhost:4200/api/todo_item').subscribe(
      response => {
        console.log(response)
        this.#todoList = response;
      })
  }

  private _todo = new ReplaySubject<Todo>(1);
  set todo(value: Todo) { this._todo.next(value); }
  rootURL = '/api';
  //deleteTodoData():delete the required todo data from database
  deleteTodoData(id: number) {
    this.registerForm = this.formBuilder.group({
      id: [''],
    });
    this.registerForm.value.id = id;
    const headers = { 'content-type': 'application/json' };
    console.log(this.registerForm)
    const body = this.registerForm.value;
    console.log(body);
    const testing = JSON.stringify(body);
    return this.http.post(this.rootURL + '/todo_item/del', { todo: testing }, { headers }).subscribe(
      response => {
        console.log(response)
      })
  }
  //updateCompleted():update todo.completed to database when todo is checked.
  updateCompleted(id: number,complete:boolean) {
    this.registerForm = this.formBuilder.group({
      id: [''],
      completed:[false],
    });
    this.registerForm.value.id = id;
    this.registerForm.value.completed = complete;
    const headers = { 'content-type': 'application/json' };
    console.log(this.registerForm)
    const body = this.registerForm.value;
    console.log(body);
    const testing = JSON.stringify(body);
    return this.http.post(this.rootURL + '/todo_item/complete', { todo: testing }, { headers }).subscribe(
      response => {
        console.log(response)
      })
  }
  //updateContent():update the content of todo after user edited it.
  updateContent(id: number, content: string) {
    this.registerForm = this.formBuilder.group({
      id: [''],
      content: [''],
    });
    this.registerForm.value.id = id;
    this.registerForm.value.content = content;
    const headers = { 'content-type': 'application/json' };
    console.log(this.registerForm)
    const body = this.registerForm.value;
    console.log(body);
    const testing = JSON.stringify(body);
    return this.http.post(this.rootURL + '/todo_item/content', { todo: testing }, { headers }).subscribe(
      response => {
        console.log(response)
      })
  }
  
 }
  

