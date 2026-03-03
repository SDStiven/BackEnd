export interface PedidoServicoType {
  cliente: string;
  descricao: string;
  horasEstimadas: number;
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
export interface PrestadorType {
    nome: string,
    precoHora: number,
    profissao: string,
    minimoParaDesconto: number,
    percentagemDesconto: number,
    taxaUrgencia: number
}

