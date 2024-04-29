import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUtilizador } from './IUtilizador';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  constructor() { }

  http = inject(HttpClient);

  getUtilizador() {
    return this.http.get<IUtilizador>(environment.apiUrl + "/bsmart/utilizador");
  }

  UpdateUtilizador(values:IUtilizador){
    return this.http.put<boolean>(environment.apiUrl + "/bsmart/utilizador", values);
  }
}
