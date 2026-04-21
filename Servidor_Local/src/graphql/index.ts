import { typeDefs } from "./typedefs/typedefs.js";
import { userResolvers } from "./resolvers/users.resolver.js";
import { servicoResolvers } from "./resolvers/servico.resolver.js";
import { categoriaResolvers } from "./resolvers/categoria.resolver.js";
import { empresaResolvers } from "./resolvers/empresa.resolver.js";
import { orcamentoResolvers } from "./resolvers/orcamento.resolver.js";
import { prestacaoServicoResolvers } from "./resolvers/prestacao_servico.resolver.js";
import { prestadorResolvers } from "./resolvers/prestador.resolver.js";
import { propostaResolvers } from "./resolvers/proposta.resolver.js";

export const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...servicoResolvers.Query,
        ...categoriaResolvers.Query,
        ...empresaResolvers.Query,
        ...orcamentoResolvers.Query,
        ...prestacaoServicoResolvers.Query,
        ...prestadorResolvers.Query,
        ...propostaResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...servicoResolvers.Mutation,
        ...categoriaResolvers.Mutation,
        ...empresaResolvers.Mutation,
        ...orcamentoResolvers.Mutation,
        ...prestacaoServicoResolvers.Mutation,
        ...prestadorResolvers.Mutation,
        ...propostaResolvers.Mutation
    }
}

export { typeDefs }