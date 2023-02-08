import { Injectable } from '@angular/core';
import { Todo } from './todo.model';


@Injectable({
  providedIn: 'root'
})

export class TodoService {
  allCompleted = false;
  uncompletedCount = 0;

  get todoList(): Todo[] {
    return this.#todoList;
  }
  #todoList: Todo[] = [];

  constructor() { }

  addTodo(todo: Omit<Todo, 'id'>): void {
    this.#todoList.push({
      id: this.#todoList.length,
      ...todo
    });
    this.allCompleted = false;
    this.uncompletedCount++;
  }

  deleteTodo(todo: Todo): void {
    this.#todoList = this.#todoList.filter(it => it.id !== todo.id);
    this.allCompleted = this.#todoList.filter(it => !it.completed).length === 0;
    this.uncompletedCount = this.#todoList.filter(it => !it.completed).length;
  }
  toggleTodo(completed: boolean, todo?: Todo): void {
    if (!todo) {
      this.#todoList.forEach(it => it.completed = completed);
      this.allCompleted = completed;
    } else {
      todo.completed = completed;
      this.allCompleted = this.#todoList.filter(it => !it.completed).length === 0;
    }
    this.uncompletedCount = this.#todoList.filter(it => !it.completed).length;
  }
  clearCompletedTodos(): void {
    this.#todoList = this.#todoList.filter(it => !it.completed);
    this.allCompleted = false;
    this.uncompletedCount = this.#todoList.length;
  }
  getFilteredTodoList(status: '' | 'active' | 'completed'): Todo[] {
    console.log('getFilteredTodoList');
    switch (status) {
      case 'active':
        return this.#todoList.filter(it => !it.completed);
      case 'completed':
        return this.#todoList.filter(it => it.completed);
      default:
        return this.#todoList;
    }
  }


  }

