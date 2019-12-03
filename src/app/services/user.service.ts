import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users';
import { apigest } from '../url';

@Injectable({ providedIn: 'root' })
export class UserService {
    
    constructor(private http: HttpClient) {
     }

    getAll() {
        return this.http.get<User[]>(apigest + '/users');
    }

    getById(id: number) {
        return this.http.get<User>(apigest + `/user/${id}`);
    }

    register(user: User) {
        return this.http.post(apigest + '/user', user);
    }

    update(user: User) {
        return this.http.put(apigest + `/user/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(apigest + `/user/${id}`);
    }

}
