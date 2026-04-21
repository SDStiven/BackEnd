import { prestadorModel } from "../../models/prestador.models.js";
import type { PrestadorDBType } from "../../Utils/types.js";

export const prestadorResolvers = {
    Query: {
        getallprestadores: async () => {
            return await prestadorModel.getAll();
        },
        getprestadorById: async (_: any, args: { id: string }) => {
            return await prestadorModel.get(args.id);
        }
    },
    Mutation: {
        createPrestador: async (_: any, args: { prestador: PrestadorDBType }) => {
            return await prestadorModel.create(args.prestador);
        },
        updatePrestador: async (_: any, args: { id: string, prestador: PrestadorDBType }) => {
            return await prestadorModel.update(args.id, args.prestador);
        },
        deletePrestador: async (_: any, args: { id: string }) => {
            return await prestadorModel.delete(args.id);
        }
    }
}
