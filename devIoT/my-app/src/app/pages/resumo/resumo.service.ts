import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumoService {

  constructor() { }
  http = inject(HttpClient);

  getConsumo(data: string) {
    return this.http.get<Consumo[]>(environment.apiUrl + "/bsmart/consumo?data=" + data)
  }

  getInterruptor() {
    return this.http.get<Interruptor[]>(environment.apiUrl + "/bsmart/interruptor")
  }

  ligar(id: number, valor: number) {
    return this.http.get<boolean>(environment.apiUrl + "/bsmart/ligar?id=" + id + "&ligado=" + valor)
  }

  find(id: number) {
    return this.http.get<InterruptorPost>(environment.apiUrl + "/bsmart/find/" + id);
  }

  remover(id: number) {
    return this.http.delete<InterruptorPost>(environment.apiUrl + "/bsmart/interruptor?id=" + id);
  }


  guardar(dado: InterruptorPost) {
    return this.http.post<InterruptorPost>(environment.apiUrl + "/bsmart/interruptor", dado);
  }

}
export interface Consumo {
  id: number;
  unidade: string;
  quantidade: number;
  localizacao: string;
  tipo: string;
  data: string;
  hora: number;
  escala: number;
}

export interface Interruptor {
  id: number;
  localizacao: string;
  tipo: string;
  ligado_manual: number;
  ligado_apoximidade: number;
  ligado_presenca: number;
  ligado_temperatura_maior: number;
  ligado_temperatura_menor: number;
  ligado_temperatura_igual: number;
  ligado_humidade_maior: number;
  ligado_humidade_menor: number;
  ligado_humidade_igual: number;
  ligado: number;
  created_at: Date;
}

export interface InterruptorPost {
  id: number;
  localizacao: string;
}
