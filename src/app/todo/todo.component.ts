import { Component } from '@angular/core';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  title = 'todomvc-app';
  constructor(private refresh: AppComponent,) { }

  ngOnInit() {
    this.refresh.ngOnInit();
  }

}

