import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cpville } from '../models';
import { apigest } from '../url';

@Injectable({
  providedIn: 'root'
})
export class CpvilleService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<Cpville[]>(apigest + '/civilites' + params);
  }

  getList(entreprise_id: number, params = '') {
    return this.http.get<Cpville[]>(apigest + `/entreprise/${entreprise_id}/civilite/list` + params);
  }

  search(column: string, searchTerm: string | {[search: string]: string; }, params = '') {
    if (searchTerm instanceof Object) {
      return this.http.post<Cpville[]>(apigest + `/cpville/search/${column}` + params, searchTerm);
    } else {
      return this.http.get<Cpville[]>(apigest + `/cpville/search/${column}/${searchTerm}` + params);
    }
  }

}
