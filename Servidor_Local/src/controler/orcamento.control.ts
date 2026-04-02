
import type { Request, Response } from "express"
import { orcamentoModel } from "../models/orcamento.moles.js"
import type { OrcamentoMySqlType } from "../Utils/types.js"

export const orcamentoControler = {
    // create orcamento
    async create(req: Request, res: Response) {
        try {
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
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    }, 
    // get all orcamentos
    async getAll(req: Request, res: Response) {
        try {
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
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },
    // get one orcamento by id
    async get(req: Request, res: Response) {
        try {
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
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },
    // update orcamento
    async update(req: Request, res: Response) {
        try {
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
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },
    // delete orcamento
    async delete(req: Request, res: Response) {
        try {
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
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },
    // calcular total do orcamento
    async calcularTotal(req: Request, res: Response) {
        try {
            const  id = req.params.id
            if(!id){
                return res.status(400).json({
                    status: "error",
                    message: "ID do orcamento inválido",
                    data: null
                })
            }
            const calcularTotalResponse = await orcamentoModel.calcularTotal(id as string)
            if(!calcularTotalResponse){
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao calcular total do orcamento,verifique se o id existe",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Total do orcamento calculado com sucesso",
                data: calcularTotalResponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    },

}