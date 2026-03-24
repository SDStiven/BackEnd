
import type { Request, Response } from "express"
import { orcamentoModel } from "../models/orcamento.moles.js"
import type { OrcamentoMySqlType } from "../Utils/types.js"

export const orcamentoControler = {
    // create orcamento
    async create(req: Request, res: Response) {
        const newOrcamento: OrcamentoMySqlType = req.body
        if(!newOrcamento){
            return res.status(400).json({
                status: "error",
                message: "Dados do orcamento inválidos",
                data: null
            })
        }
        const createOrcamentoResponse = await orcamentoModel.create(newOrcamento)
        if(!createOrcamentoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento criado com sucesso",
            data: createOrcamentoResponse
        })
    }, 
    // get all orcamentos
    async getAll(req: Request, res: Response) {
        const getOrcamentoResponse = await orcamentoModel.getAll()
        if(!getOrcamentoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamentos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamentos buscados com sucesso",
            data: getOrcamentoResponse
        })
    },
    // get one orcamento by id
    async get(req: Request, res: Response) {
        const  id = req.params.id
        if(!id){
            return res.status(400).json({
                status: "error",
                message: "ID do orcamento inválido",
                data: null
            })
        }
        const getOrcamentoResponse = await orcamentoModel.get(id as string)
        if(!getOrcamentoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar orcamento",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento buscado com sucesso",
            data: getOrcamentoResponse
        })
    },
    // update orcamento
    async update(req: Request, res: Response) {
        const  id = req.params.id
        const updateOrcamento:OrcamentoMySqlType = req.body
        if(!id){
            return res.status(400).json({
                status: "error",
                message: "ID do orcamento inválido",
                data: null
            })
        }
        if(!updateOrcamento){
            return res.status(400).json({
                status: "error",
                message: "Dados do orcamento inválidos",
                data: null
            })
        }
        const updateOrcamentoResponse = await orcamentoModel.update(id as string, updateOrcamento)
        if(!updateOrcamentoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao atualizar orcamento,verifique se o id existe e se os dados estão corretos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento atualizado com sucesso",
            data: updateOrcamentoResponse
        })
    },
    // delete orcamento
    async delete(req: Request, res: Response) {
        const  id = req.params.id
        if(!id){
            return res.status(400).json({
                status: "error",
                message: "ID do orcamento inválido",
                data: null
            })
        }
        const deleteOrcamentoResponse = await orcamentoModel.delete(id as string)
        if(!deleteOrcamentoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao apagar orcamento,verifique se o id existe",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Orcamento apagado com sucesso",
            data: deleteOrcamentoResponse
        })
    },

}