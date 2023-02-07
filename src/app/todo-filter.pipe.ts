import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo.model';
@Pipe({
  name: 'todoFilter',
  pure: true
})
export class TodoFilterPipe implements PipeTransform {
  transform(todoList: Todo[], status: '' | 'active' | 'completed'): Todo[] {
    switch (status) {
      case 'active':
        return todoList.filter(it => !it.completed);
      case 'completed':
        return todoList.filter(it => it.completed);
      default:
        return todoList;
    }
  }
}
