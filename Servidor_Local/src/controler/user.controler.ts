import { userModel } from "../models/user.models.js"
import type { utilizadorMySqlType } from "../Utils/types.js"
import type { Request, Response } from "express"





export const userControler = {
    // create user
    async create(req: Request, res: Response) {
        try {
            const newuser:utilizadorMySqlType = req.body
            if (!newuser) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do servico inválidos",
                    data: null
                })
            }

            const CreiteServicoRsesponse = await userModel.create(newuser)

            if (CreiteServicoRsesponse === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao criar servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico criado com sucesso",
                data: CreiteServicoRsesponse
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
    // get all users
    async getAll(req: Request, res: Response) {
        try {
            const users = await userModel.getAll()
            if (users === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar usuarios",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Usuarios buscados com sucesso",
                data: users
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
    // get one user by id
    async get(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user = await userModel.get(id as string)
            if (user === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao buscar usuario",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Usuario buscado com sucesso",
                data: user
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
    // update user
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const user:utilizadorMySqlType = req.body
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do servico inválidos",
                    data: null
                })
            }
            const updateServicoRsesponse = await userModel.update(id as string, user)
            if (updateServicoRsesponse === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao atualizar servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico atualizado com sucesso",
                data: updateServicoRsesponse
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
    // delete user
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            const deleteServicoRsesponse = await userModel.delete(id as string)
            if (deleteServicoRsesponse === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao deletar servico",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Servico deletado com sucesso",
                data: deleteServicoRsesponse
            })
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            })
        }
    }


}