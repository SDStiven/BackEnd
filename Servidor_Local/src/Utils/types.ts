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

export interface utilizadorType {
id : string
nome : string
numero_identificacao : string
data_nascemento : Date
email : string
telefone : string
pais : string
localidade : string
password : string
enabled : boolean
created_at : string
update_at : string
}

