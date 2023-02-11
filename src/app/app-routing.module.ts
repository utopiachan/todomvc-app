import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoGuard } from './todo.guard';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {
    path: 'todo', component: TodoComponent, canActivate: [TodoGuard], children: [
      { path: '', component: TodoListComponent, outlet: 'todo_outlet' },
    ] },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

