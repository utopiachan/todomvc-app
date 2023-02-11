import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  allCompleted = false;
  uncompletedCount = 0;
  #userList: User[] = [];
  currentUser: User | undefined;
  get userList(): User[] {
    return this.#userList;
  }
 

  constructor() { }

  addUser(user: Omit<User, 'user_id'>): void {
    this.#userList.push({
      user_id: this.#userList.length,
      ...user
    });
  }

  addTranslate(user:string|any): void {
 
  }

}

