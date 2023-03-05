import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AdminGuard
      ],
    }).compileComponents();
    guard = TestBed.inject(AdminGuard);
  });


  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
