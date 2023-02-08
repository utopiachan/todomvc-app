import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component'

const routes: Routes = [
  {
    path: 'todo', component: TodoComponent, children: [
      { path: '', component: TodoListComponent },
      { path: ':status', component: TodoListComponent }
    ] },
  { path: 'login', component: LoginComponent },
 // { path: '', component: TodoListComponent },
 // { path: ':status', component: TodoListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

