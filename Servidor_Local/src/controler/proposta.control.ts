import { propostaModel } from "../models/proposta.models.js"
import type { PropostaMySqlType } from "../Utils/types.js"
import type { Request, Response } from "express"


export const propostaControler = {
    // create proposta
    async create(req: Request, res: Response) {
        const newProposta: PropostaMySqlType = req.body
        if (!newProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados da proposta inválidos",
                data: null
            })
        }
        const createPropostaResponse = await propostaModel.create(newProposta)
        if (!createPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta criada com sucesso",
            data: createPropostaResponse
        })
    },
    // get all proposals
    async getAll(req: Request, res: Response) {
        const getPropostaResponse = await propostaModel.getAll()
        if (!getPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar propostas",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Propostas buscadas com sucesso",
            data: getPropostaResponse
        })
    },
    // get one proposal by id
    async get(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID da proposta inválido",
                data: null
            })
        }
        const getPropostaResponse = await propostaModel.get(id as string)
        if (!getPropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar proposta",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta buscada com sucesso",
            data: getPropostaResponse
        })
    },
    // update proposal
    async update(req: Request, res: Response) {
        const id = req.params.id
        const updateProposta: PropostaMySqlType = req.body
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID da proposta inválido",
                data: null
            })
        }
        if (!updateProposta) {
            return res.status(400).json({
                status: "error",
                message: "Dados da proposta inválidos",
                data: null
            })
        }
        const updatePropostaResponse = await propostaModel.update(id as string, updateProposta)
        if (!updatePropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao atualizar proposta,verifique se o id existe e se os dados estão corretos",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta atualizada com sucesso",
            data: updatePropostaResponse
        })
    },
    // delete proposal
    async delete(req: Request, res: Response) {
        const id = req.params.id
        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID da proposta inválido",
                data: null
            })
        }
        const deletePropostaResponse = await propostaModel.delete(id as string)
        if (!deletePropostaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao apagar proposta,verifique se o id existe",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Proposta apagada com sucesso",
            data: deletePropostaResponse
        })
    },
}