import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Role } from './root.service';
import { apigest } from '../url';

export interface User {
    id?: number;
    entreprise_id?: number;
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    created_at?: string;
    updated_at?: string;
    token?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    
    constructor(private http: HttpClient) {
     }

    getAll(params?: '') {
        return this.http.get<User[]>(apigest + '/users' + params);
    }

    getList(entreprise_id: number, params: '') {
        return this.http.get<User[]>(apigest + 
            `/entreprise/${entreprise_id}/users${params}`);
    }

    getById(id: number, params?: '') {
        return this.http.get<User>(apigest + `/user/${id}` + params);
    }

    getUser(entreprise_id: number, id: number, params?: '') {
        return this.http.get(apigest + 
            `/entreprise/${entreprise_id}/user/${id}${params}`);
    }

    register(user: User) {
        return this.http.post(apigest + '/user', user);
    }

    create(user: User) {
        return this.http.post(apigest + 
            `/entreprise/${user.entreprise_id}/user`, user);
    }

    update(user: User) {
        return this.http.put(apigest + `/user/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(apigest + `/user/${id}`);
    }

}
