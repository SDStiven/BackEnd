import type { Request, Response } from "express"
import { categoriaModel } from "../models/categoria.model.js"

const categoriaControler = {
    async create(req:Request,res:Response){
        try {
            const categoria = await categoriaModel.create(req.body)
            if(!categoria){
                return res.status(400).json({ message: "Categoria não criada" })
            }
            const resposta = {
                message: "Categoria criada com sucesso",
                categoria: categoria
            }
            return res.status(201).json(resposta)
        } catch (error) {
            console.log({ "catch categoria.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async getAll(req:Request,res:Response){
        try {
            const categoria = await categoriaModel.getAll()
            if(!categoria){
                return res.status(400).json({ message: "Categoria não encontrada" })
            }
            const resposta = {
                message: "Categoria encontrada com sucesso",
                categoria: categoria
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch categoria.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async get(req:Request,res:Response){
        try {
            const categoria = await categoriaModel.get(req.params.id as string)
            if(!categoria){
                return res.status(400).json({ message: "Categoria não encontrada" })
            }
            const resposta = {
                message: "Categoria encontrada com sucesso",
                categoria: categoria
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch categoria.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async update(req:Request,res:Response){
        try {
            const categoria = await categoriaModel.update(req.params.id as string,req.body)
            if(!categoria){
                return res.status(400).json({ message: "Categoria não atualizada" })
            }
            const resposta = {
                message: "Categoria atualizada com sucesso",
                categoria: categoria
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch categoria.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async delete(req:Request,res:Response){
        try {
            const categoria = await categoriaModel.delete(req.params.id as string)
            if(!categoria){
                return res.status(400).json({ message: "Categoria não deletada" })
            }
            const resposta = {
                message: "Categoria deletada com sucesso",
                categoria: categoria
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch categoria.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}
export {categoriaControler}