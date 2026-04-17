
export enum EstadoProposta {
  PENDENTE = "pendente",
  ACEITE = "aceite",
  CANCELADO = "cancelado"
}

export enum EstadoPrestacaoServico {
  PENDENTE = "pendente",
  FINALIZADO = "finalizado",
  EM_PROGRESSO = "em_progresso",
  CANCELADO = "cancelado"
}

export enum Role {
  CLIENTE = "cliente",
  ADMIN = "admin",
  PRESTADOR = "prestador",
  EMPRESA = "empresa"
}
export enum tipo_prestador {
  PRESTADOR = "prestador",
  EMPRESA = "empresa"
}
export interface CategoriaDBType {
  id: string
  designacao: string
  icone: string
  created_at: string
  updated_at: string
}
export interface ServicoDBType {
  id: string
  nome: string;
  descricao: string;
  categoria: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface PrestadorDBType {
  id: string
  nome: string;
  profissao: string;
  taxa_urgencia: number;
  minimo_desconto: number;
  nif: number;
  persentagem_desconto: number;
  preco_hora: number;
  disponivel: boolean;
}


export interface OrcamentoDBType {
  id: string
  total: number
  id_utilizador: string
  enable: boolean
  created_at: string
  updated_at: string
}

export interface UtilizadorDBType {
  id: string
  nome: string
  numero_identificacao: string
  data_nascemento: string
  email: string
  role: Role
  telefone: string
  pais: string
  localidade: string
  password: string
  enabled: boolean
  created_at: string
  updated_at: string
}

export interface PropostaDBType {

  id: string
  id_prestacao: string
  preco_hora: number
  hora_estimada: number
  estado: EstadoProposta
  id_prestador: string
  owner: string
  anable: boolean
  created_at: string
  updated_at: string
}
export interface Prestacao_servicoDBType {
  id: string
  disignacao: string
  subtotal: number
  haras_estimadas: number
  id_prestador: string
  id_servico: string
  preco_hora: number
  estado: EstadoPrestacaoServico
  id_orcamento: string
  id_utilizador: string
  id_empresa: string
  tipo_prestador: tipo_prestador
  enabled: boolean
  created_at: string
  updated_at: string
}
export interface prestacaoServicocategoria {
  id: string
  disignacao: string
  subtotal: number
  haras_estimadas: number
  id_prestador: string
  id_servico: string
  preco_hora: number
  estado: EstadoPrestacaoServico
  id_orcamento: string
  id_utilizador: string
  id_empresa: string
  tipo_prestador: tipo_prestador
  enabled: boolean
  created_at: string
  updated_at: string
  id_categoria: string
  nome_categoria: string
}

export interface responseType<T> {
  status: "success" | "error"
  message: string
  data: T | null
}
export interface prestacaoServicoDetalhesType {
  id: string
  nome_utilizador: string
  email_utilizador: string
  nome_servico: string
  descricao: string
  estado: string
  data_pedido: string
  urgente: boolean
}
export interface ServicoDetalhadaType {
  id: string
  nome: string
  descricao: string
  designacao: string
  icones: string
  id_empresa: string
  designacao_empresa: string
  icone_empresa: string
  enable: boolean
}
export interface EmpresaDBType {
  id: string
  designacao: string
  descricao: string
  localizacao: string
  nif: string
  icone: string
  id_utilizador: string
  enabled: boolean
  created_at: string
  updated_at: string
}
export interface prestacaoServicocategoria {
  id: string
  nome_utilizador: string
  email_utilizador: string
  nome_servico: string
  descricao: string
  estado: EstadoPrestacaoServico
  data_pedido: string
  urgente: boolean
  id_categoria: string
  nome_categoria: string
}
