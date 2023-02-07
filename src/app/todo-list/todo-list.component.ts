import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit {
  targetLanguage: string = '';
  constructor(

    public readonly todoService: TodoService,
    private readonly route: ActivatedRoute,
    public http: HttpClient
    
  ) {
    this.route.paramMap
      .subscribe(params => {
        this.status = (params.get('status') as 'active' | 'completed') ?? '';
      });
  }

  status: '' | 'active' | 'completed' = '';

  ngOnInit(): void {
  }

  deleteTodo(todo: Todo): void {
    this.todoService.deleteTodo(todo);
  }

  stopEditing(todo: Todo, content: string): void {
    if (todo.editing) {
      if (content.trim().length > 0) {
        todo.content = content;
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

  //translate(todo: Todo): void {
   // todo.content = this.targetLanguage
 // }

  translate(todo: Todo) {
    todo.content = this.targetLanguage;
    this.http.post("https://translation.googleapis.com/language/translate/v2?key=" + this.targetLanguage,
      {
        "q": [todo.content],
        "target": this.targetLanguage
      }
    ).subscribe((response: any) => {
      todo.content = response.data.translations[0].translatedText
    })
  }
  
  
}
