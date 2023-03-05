import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  function updateForm(userName: string, userPassword: string) {
    fixture.componentInstance.userName = userName;
    fixture.componentInstance.password = userPassword;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set user name and password to unittest", () => {
    updateForm('unittest', 'unittest');
    fixture.detectChanges();
    expect(component.userName).toEqual('unittest');
    expect(component.password).toEqual('unittest');
  });

});
