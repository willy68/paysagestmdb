import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apigest } from '../url';
import { Entreprise } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<Entreprise[]>(apigest + '/entreprises' + params);
  }

  getList(user_id: number, params = '') {
    return this.http.get<Entreprise[]>(apigest + `/user/${user_id}/entreprise/list` + params);
  }

  get(user_id: number, id: number, params = '') {
    return this.http.get<Entreprise>(apigest + `/user/${user_id}/entreprise/${id}` + params);
  }

  create(user_id: number, entreprise: Entreprise) {
    return this.http.post<Entreprise>(apigest + `/user/${user_id}/entreprise`, entreprise);
  }

  update(user_id: number, entreprise: Entreprise) {
    return this.http.put(apigest + `/user/${user_id}/entreprise/${entreprise.id}`, entreprise);
  }

  delete(user_id: number, id: number) {
    return this.http.delete(apigest + `user/${user_id}/entreprise/${id}`);
  }

}
