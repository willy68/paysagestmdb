import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { apigest } from '../url';

export interface Entreprise {
  id?: number;
  siret?: string;
  nom?: string;
  ape?: string;
  tva_intracom?: string;
  adresse?: string;
  suite_adresse?: string;
  cp?: string;
  ville?: string;
  tel?: string;
  portable: string;
  email?: string;
  regime_commercial?: string;
  logo?: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient) { }

  getAll(params?: '') {
      return this.http.get<Entreprise[]>(apigest + '/entreprises' + params);
  }

  getById(id: number, params?: '') {
      return this.http.get<Entreprise>(apigest + `/entreprise/${id}` + params);
  }

  create(entreprise: Entreprise) {
      return this.http.post<Entreprise>(apigest + '/entreprise', entreprise);
  }

  update(entreprise: Entreprise) {
      return this.http.put(apigest + `/entreprise/${entreprise.id}`, entreprise);
  }

  delete(id: number) {
      return this.http.delete(apigest + `/entreprise/${id}`);
  }

}
