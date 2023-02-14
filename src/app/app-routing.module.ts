import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodoGuard } from './todo.guard';
import { LogoutComponent } from './logout/logout.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {//directing users to different component of web-app
    path: 'todo', component: TodoComponent, canActivate: [TodoGuard], children:
      [
       { path: '', component: TodoListComponent, outlet: 'todo_outlet' },
      ]
  },
  { path: 'detail', component: UserDetailComponent, canActivate: [AdminGuard] },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: LoginComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

