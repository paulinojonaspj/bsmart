export interface IUtilizador {
  id?: number;
  nome: string;
  email: string;
  telemovel: string;
  codigoPostal: string;
  morada: string;
  casaNumero: string;
  operadoraAgua: string;
  precoFixoAgua: number;
  precoAgua: number;
  operadoraEnergia: string;
  tarifaEnergia: string;
  potenciaEnergia: number;
  precoFixoEnergia: number;
  precoP1Energia: number;
  precoP2Energia: number;
  precoP3Energia: number;
  horarioDeP1Energia: string;
  horarioAteP1Energia: string;
  horarioDeP2Energia: string;
  horarioAteP2Energia: string;
  horarioDeP3Energia: string;
  horarioAteP3Energia: string;
  palavraPasse: string;
  foto: string | null;
}
