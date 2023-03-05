import { ComponentFixture,TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  });

  it('should create the app', () => {
     fixture = TestBed.createComponent(AppComponent);
     app = fixture.componentInstance;
     expect(app).toBeTruthy();
  });

  it(`should have as title 'todomvc-app'`, () => {
     fixture = TestBed.createComponent(AppComponent);
     app = fixture.componentInstance;
     expect(app.title).toEqual('todomvc-app');
  });



});
