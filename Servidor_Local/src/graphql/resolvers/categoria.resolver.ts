import { categoriaModel } from "../../models/categoria.model.js";
import type { CategoriaDBType } from "../../Utils/types.js";

export const categoriaResolvers = {
    Query: {
        getallcategorias: async () => {
            return await categoriaModel.getAll();
        },
        getcategoriaById: async (_: any, args: { id: string }) => {
            return await categoriaModel.get(args.id);
        }
    },
    Mutation: {
        createCategoria: async (_: any, args: { categoria: CategoriaDBType }) => {
            return await categoriaModel.create(args.categoria);
        },
        updateCategoria: async (_: any, args: { id: string, categoria: CategoriaDBType }) => {
            return await categoriaModel.update(args.id, args.categoria);
        },
        deleteCategoria: async (_: any, args: { id: string }) => {
            return await categoriaModel.delete(args.id);
        }
    }
}
