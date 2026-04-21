import { servicoModel } from "../../models/serveco.modesl.js";
import type { ServicoDBType } from "../../Utils/types.js";


export const servicoResolvers = {
    Query: {
        getallservicos: async () => {
            return await servicoModel.getAll();
        },
        getservicoById: async (_: any, args: { id: string }) => {
            return await servicoModel.get(args.id);
        }
    },
    Mutation: {
        createServico: async (_: any, args: { servico: ServicoDBType }) => {
            return await servicoModel.create(args.servico);
        },
        updateServico: async (_: any, args: { id: string, servico: ServicoDBType }) => {
            return await servicoModel.update(args.id, args.servico);
        },
        deleteServico: async (_: any, args: { id: string }) => {
            return await servicoModel.delete(args.id);
        }
    }

}