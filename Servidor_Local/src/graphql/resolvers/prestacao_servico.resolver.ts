import { prestacao_servicoModel } from "../../models/prestacao_servico.models.js";
import type { Prestacao_servicoDBType } from "../../Utils/types.js";

export const prestacaoServicoResolvers = {
    Query: {
        getallprestacaoServicos: async () => {
            return await prestacao_servicoModel.getAll();
        },
        getprestacaoServicoById: async (_: any, args: { id: string }) => {
            return await prestacao_servicoModel.get(args.id);
        },
        getPrestacaoServicoDetails: async (_: any, args: { limit: number, offset: number }) => {
            return await prestacao_servicoModel.getPrestaçãoServicoDetails(args.limit, args.offset);
        },
        getPrestacaoServicoByIdOrcamento: async (_: any, args: { idOrcamento: string }) => {
            return await prestacao_servicoModel.getByIdOrcamento(args.idOrcamento);
        },
        getAllPrestacaoServicoCategoria: async (_: any, args: { idCategoria: string }) => {
            return await prestacao_servicoModel.getAllPrestacaoServicoCategoria(args.idCategoria);
        }
    },
    Mutation: {
        createPrestacaoServico: async (_: any, args: { prestacaoServico: Prestacao_servicoDBType }) => {
            return await prestacao_servicoModel.create(args.prestacaoServico);
        },
        updatePrestacaoServico: async (_: any, args: { id: string, prestacaoServico: Prestacao_servicoDBType }) => {
            return await prestacao_servicoModel.update(args.id, args.prestacaoServico);
        },
        deletePrestacaoServico: async (_: any, args: { id: string }) => {
            return await prestacao_servicoModel.delete(args.id);
        }
    }
}
