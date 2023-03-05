import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        AuthService
        ]
      });
    service = TestBed.get(AuthService);
    let store :any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('setloginstatus', () => {
    it('should store the status in localStorage',
      () => {
        service.setLoginStatus('true');
        expect(localStorage.getItem('isUserLoggedIn')).toEqual('true');
      });
  });
  describe('setUserName', () => {
    it('should store the username in localStorage',
      () => {
        service.setUserName('admin');
        expect(localStorage.getItem('getUserName')).toEqual('admin');
      });
  });


});
