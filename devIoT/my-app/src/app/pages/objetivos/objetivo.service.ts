import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Objetivo } from './objetivo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObjetivoService {

  constructor(private http: HttpClient) { }


  getObjetivos() {
    return this.http.get<Objetivo[]>(environment.apiUrl + "/bsmart/objetivos");
  }

  UpdateObjetivos(values: Objetivo) {
    return this.http.put<boolean>(environment.apiUrl + "/bsmart/objetivos", values);
  }

}
