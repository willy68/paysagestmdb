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

  getList(entreprise_id: number, params = '') {
    return this.http.get<Adresse[]>(apigest + `/entreprise/${entreprise_id}/adresse/list` + params);
  }

  get(entreprise_id: number, id: number, params = '') {
    return this.http.get<Adresse>(apigest + `/entreprise/${entreprise_id}/adresse/${id}` + params);
  }

  create(entreprise_id: number, adresse: Adresse) {
    return this.http.post<Adresse>(apigest + `/entreprise/${entreprise_id}/adresse`, adresse);
  }

  update(entreprise_id: number, adresse: Adresse) {
    return this.http.put<Adresse>(apigest + `/entreprise/${entreprise_id}/adresse/${adresse.id}`, adresse);
  }

  delete(entreprise_id: number, id: number) {
    return this.http.delete(apigest + `entreprise/${entreprise_id}/adresse/${id}`);
  }
}
