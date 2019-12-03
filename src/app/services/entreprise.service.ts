import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { User } from '../users';
import { apigest } from '../url';

export class Entreprise {

}

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Entreprise[]>(apigest + '/entreprises');
  }

  getById(id: number) {
      return this.http.get<Entreprise>(apigest + `/entreprise/${id}`);
  }

  register(entreprise: Entreprise) {
      return this.http.post(apigest + '/entreprise', entreprise);
  }

  update(entreprise: Entreprise) {
      return this.http.put(apigest + `/entreprise/${entreprise.id}`, entreprise);
  }

  delete(id: number) {
      return this.http.delete(apigest + `/entreprise/${id}`);
  }

}
