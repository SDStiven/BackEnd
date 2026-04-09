import { userModel } from "../models/user.models.js"
import { comparePassword, hashPassword } from "../Utils/password.js"
import type { UtilizadorDBType } from "../Utils/types.js"
import type { Request, Response } from "express"
import jwt from "jsonwebtoken"





export const userControler = {
    // create user
    async create(req: Request, res: Response) {
        try {
            const newuser: UtilizadorDBType = req.body
            if (!newuser) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do usuario inválidos",
                    data: null
                })
            }

            const CreiteServicoRsesponse = await userModel.create(newuser)

            return res.status(200).json({
                status: "success",
                message: "Usuario criado com sucesso",
                data: CreiteServicoRsesponse
            })
        } catch (error) {
            console.error("error user.controler.ts", error)
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
            const id = req.params.id
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
            const user = await userModel.get(id as string)
            if (!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuario nao encontrado",
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
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
            const user: UtilizadorDBType = req.body
            if (!user) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados do usuario inválidos",
                    data: null
                })
            }
            const updateServicoRsesponse = await userModel.update(id as string, user)
            if (updateServicoRsesponse === null) {
                return res.status(400).json({
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
            const isPasswordValid = await comparePassword(password, userdata.password)
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

            const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" }
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
                return res.status(400).json({
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
    },
    // Atualizar senha
    async updatePassword(req: Request, res: Response) {
        try {
            const { password, newPassword } = req.body;
            // Pegar o id do token decodificado no middleware
            const userId = (req as any).user?.id || (req as any).user?.userId;
            /*

            if (!userId) {
                return res.status(401).json({ status: "error", message: "Utilizador não autenticado", data: null });
            }*/

            const user: any= await userModel.get(userId);
            /*
            if (!user) {
                return res.status(404).json({ status: "error", message: "Utilizador não encontrado", data: null });
            }
            */

            // Verifica senha antiga
            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ status: "error", message: "Senha antiga incorreta", data: null });
            }

            // Gera hash da nova senha e atualiza
            const newHashedPassword = await hashPassword(newPassword);
            const updateResult = await userModel.updatePassword(userId, newHashedPassword);

            if (updateResult === null) {
                return res.status(500).json({ status: "error", message: "Erro ao atualizar a senha", data: null });
            }

            return res.status(200).json({ status: "success", message: "Senha atualizada com sucesso. Faça login novamente.", data: null });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: "error", message: "Erro interno do servidor", data: null });
        }
    },
    // reset password
    async resetPassword(req: Request, res: Response) {
            const { id } = req.params
    
            const updatedUser: UtilizadorDBType = req.body
    
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "ID obrigatorio",
                    data: null
                })
            }
    
            if (!updatedUser) {
                return res.status(400).json({
                    status: "error",
                    message: "Dados de utilizador invalidos",
                    data: null
                })
            }
    
            const getUserByIdResponse = await userModel.get(id as string)
    
            if (!getUserByIdResponse) {
                return res.status(404).json({
                    status: "error",
                    message: "Utilizador nao encontrado",
                    data: null
                })
            }
    
            const comparePasswordResponse = await comparePassword(updatedUser.password, getUserByIdResponse.password)
    
            if (!comparePasswordResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Password antiga invalida",
                    data: null
                })
            }
    
            const resetPasswordResponse = await userModel.resetPassword(id as string, updatedUser.password)
    
            if (!resetPasswordResponse) {
                return res.status(400).json({
                    status: "error",
                    message: "Erro ao atualizar utilizador",
                    data: null
                })
            }
    
            return res.status(200).json({
                status: "success",
                message: "Utilizador atualizado com sucesso",
                data: resetPasswordResponse
            })
        },
}