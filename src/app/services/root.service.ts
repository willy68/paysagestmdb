import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apigest } from '../url';

export enum Role {
    Root = "Root",
    User = 'User',
    Admin = 'Admin'
}

export interface Root {
    id?: number;
    email?: string;
    username?: string;
    password?: string;
    role?: Role;
    created_at?: string;
    updated_at?: string;
    token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(private http: HttpClient) {
  }

 getAll(params?: '') {
     return this.http.get<Root[]>(apigest + '/Roots' + params);
 }

 getList(params: '') {
     return this.http.get<Root[]>(apigest + 
         `/Roots${params}`);
 }

 getById(id: number, params?: '') {
     return this.http.get<Root>(apigest + `/Root/${id}` + params);
 }

 getRoot(entreprise_id: number, id: number, params?: '') {
     return this.http.get(apigest + 
         `/Root/${id}${params}`);
 }

 register(Root: Root) {
     return this.http.post(apigest + '/Root', Root);
 }

 create(Root: Root) {
     return this.http.post(apigest + 
         `/Root`, Root);
 }

 update(Root: Root) {
     return this.http.put(apigest + `/Root/${Root.id}`, Root);
 }

 delete(id: number) {
     return this.http.delete(apigest + `/Root/${id}`);
 }

}
