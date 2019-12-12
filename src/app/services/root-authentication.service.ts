import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Root } from './root.service';
import { JwtHelperService } from './jwt-helper.service';
import { apigest } from '../url';


@Injectable({
  providedIn: 'root'
})
export class RootAuthenticationService {
  private currentRootSubject: BehaviorSubject<Root>;
  public currentRoot: Observable<Root>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
      this.currentRootSubject = new BehaviorSubject<Root>(JSON.parse(localStorage.getItem('currentRoot')));
      this.currentRoot = this.currentRootSubject.asObservable();
  }

  public get currentRootValue(): Root {
      return this.currentRootSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(apigest + '/Root/login', { email, password })
          .pipe(map(root => {
              // login successful if there's a jwt token in the response
              if (root && root.token) {
                  // store Root details and jwt token in local storage to keep Root logged in between page refreshes
                  localStorage.setItem('currentRoot', JSON.stringify(root));
                  this.currentRootSubject.next(root);
              }

              return root;
          }));
  }

  logout() {
      // remove Root from local storage to log Root out
      localStorage.removeItem('currentRoot');
      this.currentRootSubject.next(null);
  }

  isAuthenticated() {
    let ret = false;
    const root = this.currentRootValue;
    if (root) {
      if (!root.token || this.jwtHelper.isTokenExpired(root.token, 0)) {
        this.logout();
      } else {
        ret = true;
      }
    }
    return ret;
  }

    refreshToken(token: string) {
        const root = this.currentRootValue;
        if (root) {
            root.token = token;
            localStorage.setItem('currentRoot', JSON.stringify(root));
        }
  }
}
