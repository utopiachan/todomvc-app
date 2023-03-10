import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo.service';
import { Todo } from '../models/todo.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  //para: targetLanguage: storing language user wants
  //username:storing the username for filtering specific entries
  targetLanguage: string = '';
  registerForm: FormGroup | any;
  users: User[] = [];
  username = localStorage.getItem('getUserName');

  constructor(
    public readonly todoService: TodoService,
    public readonly userService: UserService,
    public http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.todoService.getTodo()
  }
  //getFilter():filtering todos of the current user
  getFilter() {
    return this.todoService.todoList.filter((it => it.user_name === this.username)); 
  }
  
  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }
  //allow of editing todo with double click
  stopEditing(todo: Todo, content: string): void {
    if (todo.editing) {
      if (content.trim().length > 0) {
        todo.content = content;
        this.todoService.updateContent(todo.id, content);
      } else {
        this.todoService.deleteTodo(todo);
      }
      todo.editing = false;
    }
  }

  cancelEditing(todo: Todo): void {
    todo.editing = false;
  }

  toggleComplete(checked: boolean, todo: Todo): void {
    this.todoService.toggleTodo(checked, todo);
  }

  toggleAllComplete(checked: boolean): void {
    this.todoService.toggleTodo(checked);
  }

  clearCompletedTodos(): void {
    this.todoService.clearCompletedTodos();
  }

  //translate():send todo content to google translate api and return the translated result to user
  translate(todo: Todo) {
    this.users = this.userService.userList;
    var number_times :any =0;
    let checking = this.users.find(x => x.username === this.username);
    if (checking != undefined) {
      checking.number_translate++;
      console.log("translated:" + checking.number_translate)
      number_times = checking.number_translate;
      localStorage.setItem('getTranslate', number_times);

      this.registerForm = this.formBuilder.group({
        username: '',
        number_translate: [0],
      });
      var username = localStorage.getItem('getUserName');
      var times = localStorage.getItem('getTranslate');
      this.registerForm.value.username = username;
      this.registerForm.value.number_translate = times;
      this.userService.updateTranslate(this.registerForm);
    };

    this.http.post("https://translation.googleapis.com/language/translate/v2?key=" + 'AIzaSyVcyYuItMyWTlc',
      {
        "q": [todo.content],
        "target": this.targetLanguage
      }
    ).subscribe((res: any) => {
      todo.content=(res.data.translations[0].translatedText)
    })
    
  }
  
 
}
