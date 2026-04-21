import { gql } from "graphql-tag"

export const typeDefs = gql`
         enum Role {
            CLIENTE
            ADMIN
            PRESTADOR
            EMPRESA
         }
         enum EstadoProposta {
            PENDENTE
            ACEITE
            CANCELADO
            REJEITADA
         }
         enum EstadoPrestacaoServico {
            PENDENTE
            FINALIZADO
            EM_PROGRESSO
            CANCELADO
            EM_EXECUCAO
         }

         enum tipo_prestador {
            PRESTADOR
            EMPRESA
         }

    type Utilizador {
         id: ID!
         nome: String!
         numero_identificacao: String!
         data_nascemento: String!
         email: String!
         role: Role
         telefone: String!
         pais: String!
         localidade: String
         password: String
         enabled: Boolean
         created_at: String
         updated_at: String
    }

    input UtilizadorInput {
         nome: String!
         numero_identificacao: String!
         data_nascemento: String!
         email: String!
         role: Role
         telefone: String!
         pais: String!
         localidade: String
         password: String
         enabled: Boolean
    }

    type Proposta {
      id: ID!
      id_prestacao: ID!
      preco_hora: Float!
      hora_estimada: Int!
      estado: EstadoProposta
      id_prestador: ID!
      owner: String
      anable: Boolean
      created_at: String
      updated_at: String
    }

    input PropostaInput {
      id_prestacao: ID!
      preco_hora: Float!
      hora_estimada: Int!
      estado: EstadoProposta
      id_prestador: ID!
      owner: String
      anable: Boolean
    }

    type AceitarPropostaResponse {
      success: Boolean!
      message: String
      propostaAceite: Proposta
      prestacao: Prestacao_servico
      prestadorAceite: Prestador
      propostasRejeitadas: [Proposta]
    }

    type Prestacao_servico {
      id: ID!
      disignacao: String!
      subtotal: Float!
      haras_estimadas: Int!
      id_prestador: ID!
      id_servico: ID!
      preco_hora: Float!
      estado: EstadoPrestacaoServico
      id_orcamento: ID!
      id_utilizador: ID!
      id_empresa: ID!
      tipo_prestador: tipo_prestador
      enabled: Boolean
      created_at: String
      updated_at: String
    }

    input Prestacao_servicoInput {
      disignacao: String!
      subtotal: Float!
      haras_estimadas: Int!
      id_prestador: ID!
      id_servico: ID!
      preco_hora: Float!
      estado: EstadoPrestacaoServico
      id_orcamento: ID!
      id_utilizador: ID!
      id_empresa: ID!
      tipo_prestador: tipo_prestador
      enabled: Boolean
    }

    type PrestacaoServicoDetalhado {
      id_prestacao_servico: ID!
      id_servico: ID!
      descricao: String
      utilizador: String
      email_utilizador: String
      nome_servico: String
      data_pedido: String
      urgente: Boolean
    }

    type PrestacaoServicoCategoria {
      utilizador: String
      email_utilizador: String
      nome_servico: String
      data_pedido: String
      urgente: Boolean
      id_prestacao_servico: ID
      preco_hora: Float
      id_categoria: ID
      nome_categoria: String
      icone_categoria: String
    }

    type Categoria {
      id: ID!
      designacao: String!
      icone: String!
      created_at: String!
      updated_at: String!
    }

    input CategoriaInput {
      designacao: String!
      icone: String!
    }

    type Servico {
      id: ID!
      nome: String!
      descricao: String!
      categoria: String!
      enabled: Boolean!
      created_at: String!
      updated_at: String!
    }

    input ServicoInput {
      nome: String!
      descricao: String!
      categoria: String!
      enabled: Boolean!
    }

    type Prestador {
      id: ID!
      nome: String!
      profissao: String!
      taxa_urgencia: Float!
      minimo_desconto: Float!
      nif: Float!
      persentagem_desconto: Float!
      preco_hora: Float!
      disponivel: Boolean!
    }

    input PrestadorInput {
      nome: String!
      profissao: String!
      taxa_urgencia: Float!
      minimo_desconto: Float!
      nif: Float!
      persentagem_desconto: Float!
      preco_hora: Float!
      disponivel: Boolean!
    }

    type Orcamento {
      id: ID!
      total: Float!
      id_utilizador: ID!
      enable: Boolean!
      created_at: String!
      updated_at: String!
    }

    type CalcularTotalResponse {
      total: Float
    }

    input OrcamentoInput {
      total: Float!
      id_utilizador: ID!
      enable: Boolean!
    }

    type Empresa {
      id: ID!
      designacao: String!
      descricao: String!
      localizacao: String!
      nif: String!
      icone: String!
      id_utilizador: ID!
      enabled: Boolean!
      created_at: String!
      updated_at: String!
    }

    input EmpresaInput {
      designacao: String!
      descricao: String!
      localizacao: String!
      nif: String!
      icone: String!
      id_utilizador: ID!
      enabled: Boolean!
    }

    type Query {
      getallusers: [Utilizador]
      getuserbyid(id: ID!): Utilizador
      
      getallcategorias: [Categoria]
      getcategoriaById(id: ID!): Categoria
      
      getallempresas: [Empresa]
      getempresaById(id: ID!): Empresa
      
      getallorcamentos: [Orcamento]
      getorcamentoById(id: ID!): Orcamento
      
      getallprestacaoServicos: [Prestacao_servico]
      getprestacaoServicoById(id: ID!): Prestacao_servico
      getPrestacaoServicoDetails(limit: Int!, offset: Int!): [PrestacaoServicoDetalhado]
      getPrestacaoServicoByIdOrcamento(idOrcamento: ID!): Prestacao_servico
      getAllPrestacaoServicoCategoria(idCategoria: ID!): [PrestacaoServicoCategoria]
      
      getallprestadores: [Prestador]
      getprestadorById(id: ID!): Prestador
      
      getallpropostas: [Proposta]
      getpropostaById(id: ID!): Proposta
      
      getallservicos: [Servico]
      getservicoById(id: ID!): Servico
    }

    type Mutation {
      creatUser(user: UtilizadorInput!): Utilizador
      updateUser(id: ID!, user: UtilizadorInput!): Utilizador
      deleteUser(id: ID!): Utilizador
      
      createCategoria(categoria: CategoriaInput!): Categoria
      updateCategoria(id: ID!, categoria: CategoriaInput!): Categoria
      deleteCategoria(id: ID!): Categoria
      
      createEmpresa(empresa: EmpresaInput!): Empresa
      updateEmpresa(id: ID!, empresa: EmpresaInput!): Empresa
      deleteEmpresa(id: ID!): Empresa
      
      createOrcamento(orcamento: OrcamentoInput!): Orcamento
      updateOrcamento(id: ID!, orcamento: OrcamentoInput!): Orcamento
      deleteOrcamento(id: ID!): Orcamento
      calcularTotal(id: ID!): CalcularTotalResponse
      
      createPrestacaoServico(prestacaoServico: Prestacao_servicoInput!): Prestacao_servico
      updatePrestacaoServico(id: ID!, prestacaoServico: Prestacao_servicoInput!): Prestacao_servico
      deletePrestacaoServico(id: ID!): Prestacao_servico
      
      createPrestador(prestador: PrestadorInput!): Prestador
      updatePrestador(id: ID!, prestador: PrestadorInput!): Prestador
      deletePrestador(id: ID!): Prestador
      
      createProposta(proposta: PropostaInput!): Proposta
      updateProposta(id: ID!, proposta: PropostaInput!): Proposta
      deleteProposta(id: ID!): Proposta
      aceitarProposta(id: ID!): AceitarPropostaResponse
      
      createServico(servico: ServicoInput!): Servico
      updateServico(id: ID!, servico: ServicoInput!): Servico
      deleteServico(id: ID!): Servico
    }
`