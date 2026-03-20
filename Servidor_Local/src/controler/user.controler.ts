import { userModel } from "../models/user.models.js"
import type { utilizadorMySqlType } from "../Utils/types.js"
import type { Request, Response } from "express"





export const userControler = {
    // create user
    async create(req: Request, res: Response) {
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
    },
    // get all users
    async getAll(req: Request, res: Response) {
    },
    // get one user by id
    async get(req: Request, res: Response) {

    },
    // update user
    async update(req: Request, res: Response) {

    },
    // delete user
    async delete(req: Request, res: Response) {

    }


}