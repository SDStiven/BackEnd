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
 
export interface utilizadorMySqlType {
id : string
nome : string
numero_identificacao : string
data_nascemento : string
email : string
telefone : string
pais : string
localidade : string
password : string
enabled : boolean
created_at : string
update_at : string
}

export interface ServicoMySqlType {
  id:string
  nome: string;
  descricao: string;
  categoria: string;
  enabled: boolean;
  create_at: string;
  apdate_at: string;
}

export interface PrestadorMySqlType {
 id:string
 nome: string;
 profissao: string;
 taxa_urgencia: number;
 minimo_desconto: number;
 nif: number;
 persentagem_desconto: number;
 preco_hora: number;
 disponivel: boolean;
 create_at: string;
 apdate_at: string;
}