import { userModel } from "../models/user.models.js"
import { comparePassword } from "../Utils/password.js"
import type { utilizadorMySqlType } from "../Utils/types.js"
import type { Request, Response } from "express"
import jwt from "jsonwebtoken"





export const userControler = {
    // create user
    async create(req: Request, res: Response) {
        try {
            const newuser:utilizadorMySqlType = req.body
            if (!newuser) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do usuario inválidos",
                    data: null
                })
            }

            const CreiteServicoRsesponse = await userModel.create(newuser)
            console.log("CreiteServicoRsesponse",CreiteServicoRsesponse)

            if (CreiteServicoRsesponse === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao criar usuario",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Usuario criado com sucesso",
                data: CreiteServicoRsesponse
            })
        } catch (error) {
            console.error("error user.controler.ts",error)
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
            const id  = req.params.id
            const user = await userModel.get(id as string)

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
                    message: "Dados do usuario inválidos",
                    data: null
                })
            }
            const updateServicoRsesponse = await userModel.update(id as string, user)
            if (updateServicoRsesponse === null) {
                return res.status(500).json({
                    status: "error",
                    message: "Erro ao atualizar usuario",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Usuario atualizado com sucesso",
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
    // login user
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            console.log("email",email)
            console.log("password",password)
            if (!email || !password) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do usuario inválidos",
                    data: null
                })
            }
            const userdata = await userModel.getByEmail(email as string)
            if (!userdata) {
                return res.status(404).json({
                    status: "error",
                    message: "Nao existe usuario com este email",
                    data: null
                })
            }
            console.log("userdata",userdata)
            console.log("password",userdata.passworde)
            const isPasswordValid = await comparePassword(password, userdata.passworde)
            console.log("isPasswordValid",isPasswordValid)
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: "error",
                    message: "Credenciais invalidas",
                    data: null
                })
            }
            const payload = {
                id: userdata.id,
                email: userdata.email,
                nome: userdata.nome
            }

            const token = jwt.sign(payload,process.env.JWT_SECRET as string,{expiresIn:"1h"}
            )
            return res.status(200).json({
                status: "success",
                message: "Usuario logado com sucesso",
                data: token
            })
           
        } catch (error) {
            console.error(error)
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor catch",
                data: error
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
                    message: "Erro ao deletar usuario",
                    data: null
                })
            }
            return res.status(200).json({
                status: "success",
                message: "Usuario deletado com sucesso",
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