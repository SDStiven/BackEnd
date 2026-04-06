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
passworde : string
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
  created_at: string;
  updated_at: string;
}
 
export interface PrestadorMySqlType {
 id:string
 nome: string;
 email: string;
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

export interface PropostaMySqlType {
  
    id: string
    id_prestacao: string
    preco_hora: number
    preco_estimado: number
    estado: string
    anable: boolean
    created_at: string
    updated_at: string
}

export interface OrcamentoMySqlType {
    id: string
    total: number
    id_utilizador: string
    enable: boolean
    created_at: string
    updated_at: string
}

export interface Prestacao_servicoType {
id: string 
disignacao: string 
subtotal: number 
haras_estimadas: number 
id_prestador: string 
id_servico: string 
preco_hora: number 
estado: string 
id_orcamento: string 
enabled: boolean 
created_at: string 
updated_at: string
}