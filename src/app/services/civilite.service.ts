import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Civilite } from '../models';
import { apigest } from '../url';

@Injectable({
  providedIn: 'root'
})
export class CiviliteService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<Civilite[]>(apigest + '/civilites' + params);
  }

  getList(entreprise_id: number, params = '') {
    return this.http.get<Civilite[]>(apigest + `/entreprise/${entreprise_id}/civilite/list` + params);
  }

  get(entreprise_id: number, id: number, params = '') {
    return this.http.get<Civilite>(apigest + `/entreprise/${entreprise_id}/civilite/${id}` + params);
  }

  create(entreprise_id: number, civilite: Civilite) {
    return this.http.post<Civilite>(apigest + `/entreprise/${entreprise_id}/civilite`, civilite);
  }

  update(entreprise_id: number, civilite: Civilite) {
    return this.http.put<Civilite>(apigest + `/entreprise/${entreprise_id}/civilite/${civilite.id}`, civilite);
  }

  delete(entreprise_id: number, id: number) {
    return this.http.delete(apigest + `entreprise/${entreprise_id}/civilite/${id}`);
  }
}
