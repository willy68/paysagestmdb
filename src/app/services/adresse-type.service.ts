import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdresseType } from '../models';
import { apigest } from '../url';

@Injectable({
  providedIn: 'root'
})
export class AdresseTypeService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<AdresseType[]>(apigest + '/adresse_types' + params);
  }

  getList(entreprise_id: number, params = '') {
    return this.http.get<AdresseType[]>(apigest + `/entreprise/${entreprise_id}/adresse_type/list` + params);
  }

  get(entreprise_id: number, id: number, params = '') {
    return this.http.get<AdresseType>(apigest + `/entreprise/${entreprise_id}/adresse_type/${id}` + params);
  }

  create(entreprise_id: number, adresseType: AdresseType) {
    return this.http.post<AdresseType>(apigest + `/entreprise/${entreprise_id}/adresse_type`, adresseType);
  }

  update(entreprise_id: number, adresseType: AdresseType) {
    return this.http.put<AdresseType>(apigest + `/entreprise/${entreprise_id}/adresse_type/${adresseType.id}`, adresseType);
  }

  delete(entreprise_id: number, id: number) {
    return this.http.delete(apigest + `entreprise/${entreprise_id}/adresse_type/${id}`);
  }
}
