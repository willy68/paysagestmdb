import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models';
import { apigest } from '../url';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<Client[]>(apigest + '/clients' + params);
  }

  getList(user_id: number, params = '') {
    return this.http.get<Client[]>(apigest + `/user/${user_id}/entreprise/list` + params);
  }

  get(user_id: number, id: number, params = '') {
    return this.http.get<Client>(apigest + `/user/${user_id}/entreprise/${id}` + params);
  }

  create(user_id: number, client: Client) {
    return this.http.post<Client>(apigest + `/user/${user_id}/entreprise`, client);
  }

  update(user_id: number, client: Client) {
    return this.http.put(apigest + `/user/${user_id}/entreprise/${client.id}`, client);
  }

  delete(user_id: number, id: number) {
    return this.http.delete(apigest + `user/${user_id}/entreprise/${id}`);
  }
}
