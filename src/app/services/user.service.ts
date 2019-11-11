import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://api/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`http://api/users/${id}`);
    }

    register(user: User) {
        return this.http.post('http://api/users', user);
    }

    update(user: User) {
        return this.http.put('http://api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('http://api/users/' + id);
    }

}
