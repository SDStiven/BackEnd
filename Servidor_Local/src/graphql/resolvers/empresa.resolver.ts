import { empresaModel } from "../../models/empresa.model.js";
import type { EmpresaDBType } from "../../Utils/types.js";

export const empresaResolvers = {
    Query: {
        getallempresas: async () => {
            return await empresaModel.getAll();
        },
        getempresaById: async (_: any, args: { id: string }) => {
            return await empresaModel.get(args.id);
        }
    },
    Mutation: {
        createEmpresa: async (_: any, args: { empresa: EmpresaDBType }) => {
            return await empresaModel.create(args.empresa);
        },
        updateEmpresa: async (_: any, args: { id: string, empresa: EmpresaDBType }) => {
            return await empresaModel.update(args.id, args.empresa);
        },
        deleteEmpresa: async (_: any, args: { id: string }) => {
            return await empresaModel.delete(args.id);
        }
    }
}
