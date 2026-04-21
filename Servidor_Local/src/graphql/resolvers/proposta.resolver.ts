import { propostaModel } from "../../models/proposta.models.js";
import type { PropostaDBType } from "../../Utils/types.js";

export const propostaResolvers = {
    Query: {
        getallpropostas: async () => {
            return await propostaModel.getAll();
        },
        getpropostaById: async (_: any, args: { id: string }) => {
            return await propostaModel.get(args.id);
        }
    },
    Mutation: {
        createProposta: async (_: any, args: { proposta: PropostaDBType }) => {
            return await propostaModel.create(args.proposta);
        },
        updateProposta: async (_: any, args: { id: string, proposta: PropostaDBType }) => {
            return await propostaModel.update(args.id, args.proposta);
        },
        deleteProposta: async (_: any, args: { id: string }) => {
            return await propostaModel.delete(args.id);
        },
        aceitarProposta: async (_: any, args: { id: string }) => {
            return await propostaModel.aceitarProposta(args.id);
        }
    }
}
