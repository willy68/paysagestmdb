import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DernierCode } from '../models';
import { apigest } from '../url';


@Injectable({
  providedIn: 'root'
})
export class DernierCodeService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<DernierCode[]>(apigest + '/clients' + params);
  }

  getList(entreprise_id: number, params = '') {
    return this.http.get<DernierCode[]>(apigest + `/entreprise/${entreprise_id}/client/list` + params);
  }

  get(entreprise_id: number, id: number, params = '') {
    return this.http.get<DernierCode>(apigest + `/entreprise/${entreprise_id}/client/${id}` + params);
  }

  getLastCode(entreprise_id: number, table_nom: string) {
    return this.http.get<DernierCode>(apigest + `/entreprise/${entreprise_id}/dernier_code/${table_nom}`);
  }

  create(entreprise_id: number, client: DernierCode) {
    return this.http.post<DernierCode>(apigest + `/entreprise/${entreprise_id}/client`, client);
  }

  update(entreprise_id: number, client: DernierCode) {
    return this.http.put(apigest + `/entreprise/${entreprise_id}/client/${client.id}`, client);
  }

  delete(entreprise_id: number, id: number) {
    return this.http.delete(apigest + `entreprise/${entreprise_id}/client/${id}`);
  }
}
