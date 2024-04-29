import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IUtilizador } from '../contratos/IUtilizador';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  private url = environment.apiUrl;

  private token = "";

  login(username: string, password: string) {

    const data = {
      utilizador: username,
      palavrapasse: password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',

    });

    return this.http.post<rAuth>(this.url + '/auth', data, { headers })
  }

  getUses() {

    const headers = new HttpHeaders({
      'accept': '*/*',
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get(this.url + '/utilizador', { headers })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = "";
  }

  auth(token: string): void {
    localStorage.setItem('token', token);
  }

  isAuthenticated(): rAuth | boolean {
    const token = localStorage.getItem('token');
    if (!!token) {
      var res = <rAuth>JSON.parse(token);
      this.token = res.token;
      return res;
    }

    return false;
  }
}

export interface rAuth {
  token: string,
  valido: string,
  utilizador: IUtilizador
}

