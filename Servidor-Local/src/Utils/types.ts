export interface pedindoServico {
  cliente: string;
  descricao: string;
  horasestimadas: number;
  urgente: boolean;
}
export interface Servicotype {
  nome: string;
  precoHora: number;
  minimiDesconto: number;
  categoria: string;
  percentagemDesconto?: number;
}

export interface responseType {
  success: boolean;
  message: string;
data: Servicotype|string
}

