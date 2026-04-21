import { orcamentoModel } from "../../models/orcamento.moles.js";
import type { OrcamentoDBType } from "../../Utils/types.js";

export const orcamentoResolvers = {
    Query: {
        getallorcamentos: async () => {
            return await orcamentoModel.getAll();
        },
        getorcamentoById: async (_: any, args: { id: string }) => {
            return await orcamentoModel.get(args.id);
        }
    },
    Mutation: {
        createOrcamento: async (_: any, args: { orcamento: OrcamentoDBType }) => {
            return await orcamentoModel.create(args.orcamento);
        },
        updateOrcamento: async (_: any, args: { id: string, orcamento: OrcamentoDBType }) => {
            return await orcamentoModel.update(args.id, args.orcamento);
        },
        deleteOrcamento: async (_: any, args: { id: string }) => {
            return await orcamentoModel.delete(args.id);
        },
        calcularTotal: async (_: any, args: { id: string }) => {
            return await orcamentoModel.calcularTotal(args.id);
        }
    }
}
