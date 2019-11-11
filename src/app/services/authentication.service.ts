import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../users';
import { JwtHelperService } from './jwt-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`http://api/users/login`, { email, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  isAuthenticated() {
    let ret = false;
    const user = this.currentUserValue;
    if (user) {
      if (!user.token || this.jwtHelper.isTokenExpired(user.token, 0)) {
        this.logout();
      } else {
        ret = true;
      }
    }
    return ret;
  }

    refreshToken(token: string) {
        const user = this.currentUserValue;
        if (user) {
            user.token = token;
            localStorage.setItem('currentUser', JSON.stringify(user));
        }
  }

}
