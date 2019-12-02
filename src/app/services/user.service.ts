import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../users';
import { Api } from '../url';

@Injectable({ providedIn: 'root' })
export class UserService {
    public apigest: Api;
    
    constructor(private http: HttpClient) {
        this.apigest = new Api;
     }

    getAll() {
        return this.http.get<User[]>('http://' + this.apigest.url + '/users');
    }

    getById(id: number) {
        return this.http.get<User>(`http://` + this.apigest.url + `/user/${id}`);
    }

    register(user: User) {
        return this.http.post('http://' + this.apigest.url + '/user', user);
    }

    update(user: User) {
        return this.http.put('http://' + this.apigest.url + '/user/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('http://' + this.apigest.url + '/user/' + id);
    }

}
