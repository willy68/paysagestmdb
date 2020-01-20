import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adresse } from '../models';
import { apigest } from '../url';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<Adresse[]>(apigest + '/adresses' + params);
  }

  getList(client_id: number, params = '') {
    return this.http.get<Adresse[]>(apigest + `/client/${client_id}/adresse/list` + params);
  }

  get(client_id: number, id: number, params = '') {
    return this.http.get<Adresse>(apigest + `/client/${client_id}/adresse/${id}` + params);
  }

  create(client_id: number, adresse: Adresse) {
    return this.http.post<Adresse>(apigest + `/client/${client_id}/adresse`, adresse);
  }

  update(client_id: number, adresse: Adresse) {
    return this.http.put<Adresse>(apigest + `/client/${client_id}/adresse/${adresse.id}`, adresse);
  }

  delete(client_id: number, id: number) {
    return this.http.delete(apigest + `/client/${client_id}/adresse/${id}`);
  }
}
