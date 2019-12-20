import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apigest } from '../url';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(params = '') {
    return this.http.get<User[]>(apigest + '/users' + params);
  }

  getList(params = '') {
    return this.http.get<User[]>(apigest + `/users${params}`);
  }

  getById(id: number, params = '') {
    return this.http.get<User>(apigest + `/user/${id}` + params);
  }

  getUser(id: number, params = '') {
    return this.http.get(apigest + `/user/${id}${params}`);
  }

  register(user: User, entreprise_id: number = null) {
    if (entreprise_id === null) {
      return this.http.post(apigest + '/user', user);
    } else {
      return this.http.post(apigest + `/entreprise/${entreprise_id}/user`, user);
    }
  }

  create(user: User) {
    return this.http.post(apigest + `/user`, user);
  }

  update(user: User) {
    return this.http.put(apigest + `/user/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(apigest + `/user/${id}`);
  }

}
