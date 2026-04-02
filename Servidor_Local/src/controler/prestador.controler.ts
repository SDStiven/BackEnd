import type { PrestadorMySqlType } from "../Utils/types.js"
import { prestadorModel } from "../models/prestador.models.js"
import type { Request, Response } from "express"


export const prestadorControler = {
    // create prestador
    async create(req: Request, res: Response) {
        try {
            const newPrestador: PrestadorMySqlType = req.body
            if (!newPrestador) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do prestador inválidos",
                    data: null
                })
            }
            const createPrestadorResponse = await prestadorModel.create(newPrestador)
            if (!createPrestadorResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao criar prestador",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestador criado com sucesso",
                data: createPrestadorResponse
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

    // getAll prestadores
    async getAll(req: Request, res: Response) {
        try {
            const prestadores = await prestadorModel.getAll()
            if (!prestadores) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar prestadores",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestadores buscados com sucesso",
                data: prestadores
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

    // get one prestador by id
    async get(req: Request, res: Response) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do prestador inválido",
                    data: null
                })
            }
            const prestador = await prestadorModel.get(id as string)
            if (!prestador) {
                return res.status(404).json({
                    status: "error",
                    message: "Prestador não encontrado",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestador buscado com sucesso",
                data: prestador
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

    // update prestador
    async update(req: Request, res: Response) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do prestador inválido",
                    data: null
                })
            }
            const updatePrestador: PrestadorMySqlType = req.body
            if (!updatePrestador) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do prestador inválidos",
                    data: null
                })
            }
            const updatePrestadorResponse = await prestadorModel.update(id as string,updatePrestador)
            if (!updatePrestadorResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao atualizar prestador",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestador atualizado com sucesso",
                data: updatePrestadorResponse
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

    // delete prestador
    async delete (req: Request, res: Response) {
        try {
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID do prestador inválido",
                    data: null
                })
            }
            const deletePrestadorResponse = await prestadorModel.delete(id as string)
            if (!deletePrestadorResponse) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao deletar prestador",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Prestador deletado com sucesso",
                data: deletePrestadorResponse
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