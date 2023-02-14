import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class UserService {
 //paras: userlist: storing userdata locally in user formate
  #userList: User[] = [];
  rootURL = '/api';
  private _user = new ReplaySubject<User>(1);
  registerForm: FormGroup | any;
  set user(value: User) { this._user.next(value); }
  
  get userList(): User[] {
    return this.#userList;
  }
  //getUsers():retreive user information from database
  getUsers() {
    return this.http.get<any>('http://localhost:4200/api/user').subscribe(
      response => {
        console.log(response)
        this.#userList = response;
      })
  }


  constructor(
    public http: HttpClient
  ) { }
//registration():registration of user to database
  registration(form: FormGroup) {
    const headers = { 'content-type': 'application/json' };
    const body = form.value;
    console.log(body);
    const testing = JSON.stringify(body);
    console.log('form='+testing);
    return this.http.post(this.rootURL + '/user/reg', { user: testing }, { headers }).toPromise().then((result) => {
      return result;
    }).catch(error => { throw error });
  }
  //updateTranslate():update the number of translate count when user click translate button
  updateTranslate(form: FormGroup) {
    const headers = { 'content-type': 'application/json' };
    const body = form.value;
    console.log(body);
    const testing = JSON.stringify(body);
    console.log('form=' + testing);
    return this.http.post(this.rootURL + '/user/update', { user: testing }, { headers }).toPromise().then((result) => {
      return result;
    }).catch(error => { throw error });
  }
}

