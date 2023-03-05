import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { TodoGuard } from './todo.guard';

describe('TodoGuard', () => {
  let guard: TodoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        TodoGuard
      ],
});
    guard = TestBed.inject(TodoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
