import type { Prestacao_servicoDBType, prestacaoServicocategoria, prestacaoServicoDetalhesType } from "../Utils/types.js"
import { prestacao_servicoModel } from "../models/prestacao_servico.models.js"
import type { Request, Response } from "express"

export const prestacao_servicoControler = {
    // create prestacao_servico
    async create(req: Request, res: Response): Promise<Prestacao_servicoDBType | any> {
        try {
            const newPrestacao_servico: Prestacao_servicoDBType = req.body
            if (!newPrestacao_servico) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do prestacao_servico inválidos",
                    data: null
                })
            }
            const createPrestacao_servicoResponse = await prestacao_servicoModel.create(newPrestacao_servico)
            if (!createPrestacao_servicoResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao criar prestacao_servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestacao_servico criado com sucesso",
                data: createPrestacao_servicoResponse
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
    // get all prestacao_servico
    async getAll(req: Request, res: Response): Promise<Prestacao_servicoDBType[] | any> {
        try {
            const getPrestacao_servicoResponse = await prestacao_servicoModel.getAll()
            if (!getPrestacao_servicoResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar prestacao_servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestacao_servico buscado com sucesso",
                data: getPrestacao_servicoResponse
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
    // get one prestacao_servico by id
    async get(req: Request, res: Response): Promise<Prestacao_servicoDBType | any> {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do prestacao_servico inválido",
                    data: null
                })
            }
            const getPrestacao_servicoResponse = await prestacao_servicoModel.get(id as string)
            if (!getPrestacao_servicoResponse) {
                return res.status(404).json({
                    status: "error",
                    message: "Erro ao buscar prestacao_servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestacao_servico buscado com sucesso",
                data: getPrestacao_servicoResponse
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
    // update prestacao_servico
    async update(req: Request, res: Response): Promise<Prestacao_servicoDBType | any> {
        try {
            const id = req.params.id
            const updatePrestacao_servico: Prestacao_servicoDBType = req.body
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do prestacao_servico inválido",
                    data: null
                })
            }
            if (!updatePrestacao_servico) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do prestacao_servico inválidos",
                    data: null
                })
            }
            const updatePrestacao_servicoResponse = await prestacao_servicoModel.update(id as string, updatePrestacao_servico)
            if (!updatePrestacao_servicoResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao atualizar prestacao_servico,verifique se o id existe e se os dados estão corretos",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestacao_servico atualizado com sucesso",
                data: updatePrestacao_servicoResponse
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
    // delete prestacao_servico
    async delete(req: Request, res: Response): Promise<Prestacao_servicoDBType | any> {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do prestacao_servico inválido",
                    data: null
                })
            }
            const deletePrestacao_servicoResponse = await prestacao_servicoModel.delete(id as string)
            if (!deletePrestacao_servicoResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao apagar prestacao_servico,verifique se o id existe",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestacao_servico apagado com sucesso",
                data: deletePrestacao_servicoResponse
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
    async getPrestaçãoServicoDetalhada(req: Request, res: Response): Promise<prestacaoServicoDetalhesType | any> {
        const { limit, offset } = req.params as { limit: string, offset: string }

        let LIMIT = 10
        let OFFSET = 0

        if (limit && parseInt(limit) > 0) LIMIT = parseInt(limit)
        if (offset && parseInt(offset) > 0) OFFSET = parseInt(offset)

        const prestacaoServicoResponse = await prestacao_servicoModel.getPrestaçãoServicoDetails(LIMIT, OFFSET)

        if(!prestacaoServicoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestacao_servico",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestacao_servico buscado com sucesso",
            data: prestacaoServicoResponse
        })

    },
    async getPrestaçãoServicoCategoria(req: Request, res: Response): Promise<prestacaoServicocategoria[] | any> {
        const { idCategoria } = req.params as { idCategoria: string }

        const prestacaoServicoResponse = await prestacao_servicoModel.getAllPrestacaoServicoCategoria(idCategoria as string)

        if(!prestacaoServicoResponse){
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar prestacao_servico",
                data: prestacaoServicoResponse
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Prestacao_servico buscado com sucesso",
            data: prestacaoServicoResponse
        })

    }



}
