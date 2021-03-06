import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { JwtHelperService } from './jwt-helper.service';
import { apigest } from '../url';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public returnUrl: string;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string, entreprise_id: number = null) {
    let params = '';
    if (entreprise_id !== null) {
      params = '?entreprise_id=' + entreprise_id;
    }
    return this.http.post<any>(apigest + '/user/login' + params,
      { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.updateUser(user);
        }

        return user;
      }));
  }

  updateUser(user: User) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
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
