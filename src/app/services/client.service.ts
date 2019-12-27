import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models';
import { apigest } from '../url';

/*
  <route url="/entreprise/([0-9]+)/clients(\?.+=.+)*" module="client" action="list" vars="entreprise_id,params"/>
  <route url="/entreprise/([0-9]+)/client/list(\?.+=.+)*" module="client" action="list" vars="entreprise_id,params"/>
  <route url="/entreprise/([0-9]+)/client(\?.+=.+)*" module="client" action="create" vars="entreprise_id,params"/>
  <route url="/entreprise/([0-9]+)/client/create(\?.+=.+)*" module="client" action="create" vars="entreprise_id,params"/>
  <route url="/entreprise/([0-9]+)/client/([0-9]+)" module="client" action="by_id" vars="entreprise_id,id"/>

  <route url="/clients(\?.+=.+)*" module="client" action="list" vars="params"/>
  <route url="/client/list(\?.+=.+)*" module="client" action="list" vars="params"/>
  <route url="/client(\?.+=.+)*" module="client" action="create" vars="params"/>
  <route url="/client/create(\?.+=.+)*" module="client" action="create" vars="params"/>
  <route url="/client/([0-9+])(\?.+=.+)*" module="client" action="by_id" vars="id,params"/>
*/

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAll(params = '') {
    return this.http.get<Client[]>(apigest + '/clients' + params);
  }

  getList(entreprise_id: number, params = '') {
    return this.http.get<Client[]>(apigest + `/entreprise/${entreprise_id}/client/list` + params);
  }

  get(entreprise_id: number, id: number, params = '') {
    return this.http.get<Client>(apigest + `/entreprise/${entreprise_id}/client/${id}` + params);
  }

  create(entreprise_id: number, client: Client) {
    return this.http.post<Client>(apigest + `/entreprise/${entreprise_id}/client`, client);
  }

  update(entreprise_id: number, client: Client) {
    return this.http.put(apigest + `/entreprise/${entreprise_id}/client/${client.id}`, client);
  }

  delete(entreprise_id: number, id: number) {
    return this.http.delete(apigest + `entreprise/${entreprise_id}/client/${id}`);
  }
}
