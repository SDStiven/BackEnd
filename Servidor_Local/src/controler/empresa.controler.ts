import type { Request, Response } from "express"
import { empresaModel } from "../models/empresa.model.js"

const empresaControler = {
    async create(req: Request, res: Response) {
        try {
            const empresa = await empresaModel.create(req.body)
            if (!empresa) {
                return res.status(400).json({ message: "Empresa não criada" })
            }
            const resposta = {
                message: "Empresa criada com sucesso",
                empresa: empresa
            }
            return res.status(201).json(resposta)
        } catch (error) {
            console.log({ "catch empresa.controler.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async getAll(req: Request, res: Response) {
        try {
            const empresas = await empresaModel.getAll()
            if (!empresas) {
                return res.status(400).json({ message: "Empresas não encontradas" })
            }
            const resposta = {
                message: "Empresas encontradas com sucesso",
                empresas: empresas
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch empresa.controler.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async get(req: Request, res: Response) {
        try {
            const empresa = await empresaModel.get(req.params.id as string)
            if (!empresa) {
                return res.status(400).json({ message: "Empresa não encontrada" })
            }
            const resposta = {
                message: "Empresa encontrada com sucesso",
                empresa: empresa
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch empresa.controler.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async update(req: Request, res: Response) {
        try {
            const empresa = await empresaModel.update(req.params.id as string, req.body)
            if (!empresa) {
                return res.status(400).json({ message: "Empresa não atualizada" })
            }
            const resposta = {
                message: "Empresa atualizada com sucesso",
                empresa: empresa
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch empresa.controler.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const empresa = await empresaModel.delete(req.params.id as string)
            if (!empresa) {
                return res.status(400).json({ message: "Empresa não deletada" })
            }
            const resposta = {
                message: "Empresa deletada com sucesso",
                empresa: empresa
            }
            return res.status(200).json(resposta)
        } catch (error) {
            console.log({ "catch empresa.controler.ts": error })
            return res.status(500).json({ message: "Internal server error" })
        }
    }
}
export { empresaControler }
